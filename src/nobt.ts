import { Debt, Expense, NobtResponse } from './api/api';

/**
 * Defines the nobt model (as in the M in MVC) used throughout the frontend.
 *
 * It is purposely framework agnostic.
 */
export class Nobt {
  public static fromServerResponse(response: NobtResponse) {
    return new Nobt(
      response.id,
      response.name,
      response.currency,
      response.participatingPersons,
      response.debts,
      response.expenses.map(Bill.fromServerResponse),
      response.deletedExpenses.map(Bill.fromServerResponse),
      response.createdOn
    );
  }

  public static empty() {
    return new Nobt('', '', '', [], [], [], [], '');
  }

  constructor(
    public id: string,
    public name: string,
    public currency: string,
    private members: string[],
    private debts: Debt[],
    private bills: Bill[],
    private deletedBills: Bill[],
    private createdOn: string
  ) {}

  public get total(): number {
    return this.bills
      .filter(bill => !bill.deletedOn)
      .map(bill => bill.sum)
      .reduce((sum, current) => sum + current, 0);
  }

  public get numberOfMembers(): number {
    return this.members.length;
  }

  public balanceOf(name: string): Balance {
    return computeBalanceForPerson(this.debts, sanitizeName(name));
  }

  public get balances(): Balance[] {
    return this.members.map(name => computeBalanceForPerson(this.debts, name));
  }

  public get isEmpty() {
    return this.bills.length === 0 && this.deletedBills.length === 0;
  }

  // TODO: `number` should be fine here, but it is hard to enforce the type on the outside
  public bill(id: number | string): Bill | undefined {
    if (typeof id === 'string') {
      id = parseInt(id, 10);
    }
    return this.bills.concat(this.deletedBills).find(bill => bill.id === id);
  }
}

export class Bill {
  public static fromServerResponse(expense: Expense) {
    return new Bill(
      expense.id,
      expense.name,
      expense.debtee,
      expense.date,
      expense.createdOn,
      expense.deletedOn,
      expense.conversionInformation,
      expense.shares,
      expense._links || {}
    );
  }

  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly debteeName: string,
    public readonly date: string,
    public readonly createdOn: string,
    public readonly deletedOn: string | undefined,
    public readonly conversionInformation: {
      foreignCurrency: string;
      rate: number;
    },
    public readonly shares: Share[],
    public readonly links: {
      delete?: string;
    }
  ) {}

  public get canBeDeleted(): boolean {
    return this.deleteLink !== undefined;
  }

  public get deleteLink(): string | undefined {
    return this.links.delete;
  }

  public get debtors() {
    return this.shares.map(share => ({
      name: share.debtor,
      amount: share.amount,
    }));
  }

  public get debtee() {
    return {
      name: this.debteeName,
      amount: this.sum,
    };
  }

  public get sum() {
    return sumShares(this.shares);
  }
}

export interface Share {
  debtor: string;
  amount: number;
}

export function sumShares(shares: Share[]): number {
  return shares
    .map(share => share.amount)
    .reduce((sum, amount) => sum + amount);
}

export interface Balance {
  me: { name: string; amount: number };
  persons: Array<{
    name: string;
    amount: number;
  }>;
}

// quickfix for bug 277
function sanitizeName(name) {
  return name.trim();
}

/**
 * Computes the "balance" of a single person within the nobt.
 *
 * This functionality requires from rather convoluted handling of the data that we get from the server.
 * Moving this to the backend would simplify things here: https://github.com/nobt-io/api/issues/101
 */
export function computeBalanceForPerson(
  debt: Debt[],
  ownName: string
): Balance {
  let summaries = debt
    .filter(tx => {
      return tx.debtee === ownName || tx.debtor === ownName;
    })
    .map(tx => {
      if (tx.debtor === ownName) {
        return {
          debtee: tx.debtee,
          amount: tx.amount * -1,
          debtor: tx.debtor,
        };
      } else {
        return tx;
      }
    })
    .map(tx => {
      if (tx.debtee === ownName) {
        return { name: tx.debtor, amount: tx.amount };
      } else {
        return { name: tx.debtee, amount: tx.amount };
      }
    });

  let total = summaries.reduce((sum, tx) => sum + tx.amount, 0);

  return {
    me: { name: ownName, amount: total },
    persons: summaries,
  };
}
