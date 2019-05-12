import {
  ADD_MEMBER,
  INVALIDATE_NOBT,
  UPDATE_FETCH_NOBT_STATUS,
} from './actions';
import { AsyncActionStatus } from 'const/AsyncActionStatus';
import _debug from 'debug';

const emptyHandler = (status: any) => ({ data: {} });

const updateFetchNobtStatusActionPayloadHandler = {
  [AsyncActionStatus.IN_PROGRESS]: emptyHandler,
  [AsyncActionStatus.FAILED]: emptyHandler,
  [AsyncActionStatus.SUCCESSFUL]: payload => ({
    data: {
      id: payload.nobt.id,
      name: payload.nobt.name,
      currency: payload.nobt.currency,
      participatingPersons: payload.nobt.participatingPersons,
      transactions: [
        ...(payload.nobt.transactions || []),
        ...(payload.nobt.debts || []),
      ],
      bills: [
        ...(payload.nobt.expenses || []),
        ...(payload.nobt.deletedExpenses || []),
      ],
      createdOn: payload.nobt.createdOn,
      conversionInformation: payload.nobt.conversionInformation,
    },
  }),
};

const handlers = {
  [UPDATE_FETCH_NOBT_STATUS]: (state, action) => {
    const handler =
      updateFetchNobtStatusActionPayloadHandler[action.payload.status] ||
      emptyHandler;
    let newState = handler(action.payload);

    return {
      ...state,
      ...newState,
      data: {
        ...state.data,
        ...newState.data,
      },
      nobtFetchTimestamp: Date.now(),
      fetchNobtStatus: action.payload.status,
    };
  },

  [ADD_MEMBER]: (state, action) => {
    let currentMembers = state.data.participatingPersons;
    let memberToAdd = action.payload.name;

    if (currentMembers.find(name => name === memberToAdd) !== undefined) {
      _debug(ADD_MEMBER)(`Person with name '${memberToAdd}' already exists.`);
      return state;
    }

    let newData = {
      ...state.data,
      participatingPersons: [...currentMembers, memberToAdd],
    };

    return { ...state, data: newData };
  },

  [INVALIDATE_NOBT]: state => {
    return {
      ...state,
      nobtFetchTimestamp: null,
    };
  },
};

interface Share {
  name: string;
  amount: number;
}

interface Bill {
  id: number;
  name: string;
  date: string;
  createdOn: string;
  debtee: Share;
  debtors: Share[];
}

interface Nobt {
  id: string;
  name: string;
  currency: string;
  participatingPersons: string[];
  bills: Bill[];
  createdOn: string | null;
  transactions: any[];
  payments: any[];
}

interface State {
  fetchNobtStatus: AsyncActionStatus | null;
  nobtFetchTimestamp: string | null;
  data: Nobt;
}

export const initialState: State = {
  fetchNobtStatus: null,
  nobtFetchTimestamp: null,
  data: {
    id: '',
    name: '',
    currency: '',
    participatingPersons: [], // TODO rename to members
    transactions: [],
    bills: [],
    payments: [],
    createdOn: null,
  },
};

export default function currentNobt(state = initialState, action) {
  const handler = handlers[action.type];

  if (!handler) {
    _debug('reducer:currentNobt')('[WARN] No handler found for ', action);
    return state;
  }

  return handler(state, action);
}
