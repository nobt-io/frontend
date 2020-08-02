import { useContext, createContext } from 'react';

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

export interface Nobt {
  id: string;
  name: string;
  currency: string;
  participatingPersons: string[];
  bills: Bill[];
  createdOn: string;
  transactions: Transaction[];
  payments: any[];
}

export interface Transaction {
  amount: number;
  debtor: string;
  debtee: string;
}

export const NobtContext = createContext<Nobt>({
  bills: [],
  createdOn: '',
  currency: '',
  id: '',
  name: '',
  participatingPersons: [],
  payments: [],
  transactions: [],
});

export function useNobt() {
  return useContext(NobtContext);
}
