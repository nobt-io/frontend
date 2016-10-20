import {
  FETCH_NOBT_STARTED,
  FETCH_NOBT_SUCCEEDED,
  FETCH_NOBT_FAILED,
  ADD_MEMBER
} from "./actions";

const handlers = {
  [FETCH_NOBT_STARTED]: (state, action) => {
    return {...state, isLoading: true}
  },

  [FETCH_NOBT_SUCCEEDED]: (state, action) => {

    /*
     TODO this is work for a selector
     paidByPersonIsNotSet, reset it with first person
     if (state.newBillViewInfo.paidByPerson === "") {
     newBillViewInfo = {...state.newBillViewInfo, paidByPerson: action.payload.nobt.participatingPersons[ 0 ]};
     }
     */

    const response = action.payload.nobt;

    var data = {
      id: response.id,
      name: response.name,
      currency: response.currency,
      participatingPersons: response.participatingPersons,
      transactions: response.transactions,
      bills: response.expenses,
    };

    return {data: data, isLoading: false}
  },

  [FETCH_NOBT_FAILED]: (state, action) => {
    // only reset the loading state for now.
    return {...state, isLoading: false}
  },

  [ADD_MEMBER]: (state, action) => {

    var currentMembers = state.data.participatingPersons;
    var memberToAdd = action.payload.name;

    var memberSet = new Set(currentMembers);
    memberSet.add(memberToAdd);

    var newData = {
      ...state.data,
      participatingPersons: [ ...memberSet ]
    };

    return {...state, data: newData}
  },
};

const initialState = {
  isLoading: false,
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
