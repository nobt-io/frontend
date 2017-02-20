import { CHANGE_TAB, UPDATE_BILL_FILTER, UPDATE_BILL_SORT_PROPERTY } from "./actions"

const handlers = {
  [CHANGE_TAB]: (state, action) => ({...state, activeTab: action.payload.tabName}),

  [UPDATE_BILL_FILTER]: (state, action) => ({...state, billFilter: action.payload.memberName}),

  [UPDATE_BILL_SORT_PROPERTY]: (state, action) => ({
    ...state,
    billSortProperty: action.payload.property
  }),
};

const initialState = {
  activeTab: "transactions",
  billFilter: "",
  billSortProperty: "Date",
};

export default function viewState(state = initialState, action) {
  const handler = handlers[ action.type ];
  return handler ? handler(state, action) : state;
}
