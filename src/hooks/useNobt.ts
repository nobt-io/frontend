import { createContext, useContext } from 'react';
import { Nobt } from '../nobt';

export const NobtContext = createContext<Nobt>(Nobt.empty());

export function useNobt() {
  return useContext(NobtContext);
}
