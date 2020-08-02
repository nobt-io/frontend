import { Transaction, useNobt } from './useNobt';
import { useMemo } from 'react';

export interface Balance {
  me: { name: string; amount: number };
  persons: Array<{
    name: string;
    amount: number;
  }>;
}

/**
 * Computes the "balance" of a single person within the nobt.
 *
 * This functionality requires from rather convoluted handling of the data that we get from the server.
 * Moving this to the backend would simplify things here: https://github.com/nobt-io/api/issues/101
 */
export function useBalance(name: string): Balance {
  const nobt = useNobt();
  const balance = useMemo(
    () => computeBalanceForPerson(nobt.transactions, sanitizeName(name)),
    [nobt, name]
  );

  return balance;
}

// quickfix for bug 277
function sanitizeName(name) {
  return name.trim();
}

export function computeBalanceForPerson(
  transactions: Transaction[],
  ownName: string
): Balance {
  let summaries = transactions
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
