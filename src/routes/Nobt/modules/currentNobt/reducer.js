import { UPDATE_FETCH_NOBT_STATUS, UPDATE_ADD_BILL_STATUS, ADD_MEMBER } from "./actions";
import AsyncActionStatus from "const/AsyncActionStatus";
import _debug from "debug";

const updateFetchNobtStatusActionPayloadHandler = {
  [AsyncActionStatus.IN_PROGRESS]: () => {},
  [AsyncActionStatus.SUCCESSFUL]: (payload) => ({
    data: {
      id: payload.nobt.id,
      name: payload.nobt.name,
      currency: payload.nobt.currency,
      participatingPersons: payload.nobt.participatingPersons,
      transactions: payload.nobt.transactions,
      bills: payload.nobt.expenses,
    }
  }),
  [AsyncActionStatus.FAILED]: () => {},
  [null]: () => {}
};

const handlers = {
  [UPDATE_FETCH_NOBT_STATUS]: (state, action) => {
    let newState = updateFetchNobtStatusActionPayloadHandler[ action.payload.status ](action.payload);

    return {
      ...state,
      ...newState,
      fetchNobtStatus: action.payload.status
    }
  },
  [UPDATE_ADD_BILL_STATUS]: (state, action) => {
    return {
      ...state,
      addBillStatus: action.payload.status
    }
  },

  [ADD_MEMBER]: (state, action) => {

    var currentMembers = state.data.participatingPersons;
    var memberToAdd = action.payload.name;

    if (currentMembers.find(name => name === memberToAdd) !== undefined) {
      _debug(ADD_MEMBER)(`Person with name '${memberToAdd}' already exists.`);
      return state;
    }

    var newData = {
      ...state.data,
      participatingPersons: [ ...currentMembers, memberToAdd ]
    };

    return {...state, data: newData}
  },
};

const initialState = {
  fetchNobtStatus: null,
  addBillStatus: null,
  data: {
    id: "",
    name: "",
    currency: "",
    participatingPersons: [], // TODO rename to members
    transactions: [],
    bills: [],
  }
};

export default function currentNobt(state = initialState, action) {
  const handler = handlers[ action.type ];
  return handler ? handler(state, action) : state;
}
