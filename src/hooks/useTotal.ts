import { Bill, Nobt, useNobt } from './useNobt';
import { useMemo } from 'react';

export function useTotal(): number {
  const nobt = useNobt();
  const total = useMemo(() => computeTotal(nobt), [nobt]);

  return total;
}

function computeTotal(nobt: Nobt): number {
  return nobt.bills
    .filter(bill => !bill.deletedOn)
    .map(sumBill)
    .reduce((sum, current) => sum + current, 0);
}

export function sumBill(bill: Bill): number {
  return bill.shares
    .map(share => share.amount)
    .reduce((sum, amount) => sum + amount);
}
