import { useRouteMatch } from 'react-router';

interface Paths {
  feed: () => string;
  balances: () => string;
  balanceFor: (name) => string;
  billDetails: (id: number) => string;
  newBill: (subPage?: string) => string;
}

interface Params {
  nobtId: string;
}

export default function usePaths(): Paths {
  const match = useRouteMatch<Params>('/:nobtId');

  if (!match) {
    const fail = () => {
      throw new Error('wrong usage of usePaths');
    };

    return {
      feed: fail,
      balances: fail,
      balanceFor: fail,
      billDetails: fail,
      newBill: fail,
    };
  }

  const nobtId = match.params.nobtId;

  return {
    feed: () => `/${nobtId}`,
    balances: () => `/${nobtId}/balances`,
    balanceFor: name => `/${nobtId}/balances/${name}`,
    billDetails: id => `/${nobtId}/${id}`,
    newBill: (subPage = '') => `/${nobtId}/bill/${subPage}`,
  };
}
