import { ADD_MEMBER, INVALIDATE_NOBT, UPDATE_FETCH_NOBT_STATUS } from "./actions";
import AsyncActionStatus from "const/AsyncActionStatus";
import _debug from "debug";

const updateFetchNobtStatusActionPayloadHandler = {
  [AsyncActionStatus.IN_PROGRESS]: () => {},
  [AsyncActionStatus.SUCCESSFUL]: (payload) => (
    {
      data: {
        id: payload.nobt.id,
        name: payload.nobt.name,
        currency: payload.nobt.currency,
        participatingPersons: payload.nobt.participatingPersons,
        transactions: [
          ...(payload.nobt.transactions || []),
          ...(payload.nobt.debts || [])
        ],
        bills: payload.nobt.expenses,
        createdOn: payload.nobt.createdOn
      }
    }
  ),
  [AsyncActionStatus.FAILED]: () => {},
  [null]: () => {}
};

const handlers = {
  [UPDATE_FETCH_NOBT_STATUS]: (state, action) => {
    let newState = updateFetchNobtStatusActionPayloadHandler[ action.payload.status ](action.payload);

    return {
      ...state,
      ...newState,
      data: {
        ...(state.data),
        ...(newState.data)
      },
      nobtFetchTimestamp: Date.now(),
      fetchNobtStatus: action.payload.status
    }
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
      participatingPersons: [ ...currentMembers, memberToAdd ]
    };

    return {...state, data: newData}
  },

  [INVALIDATE_NOBT]: (state, action) => {

    return {
      ...state,
      nobtFetchTimestamp: null
    }
  },
};

export const initialState = {
  fetchNobtStatus: null,
  nobtFetchTimestamp: null,
  data: {
    id: "",
    name: "",
    currency: "",
    participatingPersons: [], // TODO rename to members
    transactions: [],
    bills: [],
    createdOn: null
  }
};

export default function currentNobt(state = initialState, action) {
  const handler = handlers[ action.type ];

  if (!handler) {
    _debug("reducer:currentNobt")("[WARN] No handler found for ", action);
    return state;
  }

  return handler(state, action);
}
