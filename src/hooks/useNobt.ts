import { createContext, useContext } from 'react';
import { Debt, NobtResponse } from '../api/api';

export interface Share {
  debtor: string;
  amount: number;
}

export interface Bill {
  id: number;
  name: string;
  date: string;
  createdOn: string;
  deletedOn?: string;
  shares: Share[];
}

export interface Balance {
  me: { name: string; amount: number };
  persons: Array<{
    name: string;
    amount: number;
  }>;
}

export class Nobt {
  public static fromServerResponse(response: NobtResponse) {
    return new Nobt(
      response.id,
      response.name,
      response.currency,
      response.participatingPersons,
      response.debts,
      response.expenses,
      response.deletedExpenses,
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
    private participatingPersons: string[],
    private debts: Debt[],
    private bills: Bill[],
    private deletedBills: Bill[],
    private createdOn: string
  ) {}

  public get total(): number {
    return this.bills
      .filter(bill => !bill.deletedOn)
      .map(sumBill)
      .reduce((sum, current) => sum + current, 0);
  }

  public get numberOfMembers(): number {
    return this.participatingPersons.length;
  }

  public balanceOf(name: string): Balance {
    return computeBalanceForPerson(this.debts, name);
  }

  public get isEmpty() {
    return this.bills.length === 0 && this.deletedBills.length === 0;
  }
}

export const NobtContext = createContext<Nobt>(Nobt.empty());

export function useNobt() {
  return useContext(NobtContext);
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

export function sumBill(bill: Bill): number {
  return bill.shares
    .map(share => share.amount)
    .reduce((sum, amount) => sum + amount);
}
