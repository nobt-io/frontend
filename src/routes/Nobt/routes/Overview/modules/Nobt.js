import { getNobt } from "api/api";

const actionNames = {
  LOAD_NOBT: 'Nobt.LOAD_NOBT',
  SET_NOBT: 'Nobt.SET_NOBT',
  CHANGE_TAB: 'Nobt.CHANGE_TAB',
  UPDATE_EXPENSES_FILTER: 'Nobt.UPDATE_EXPENSES_FILTER',
  UPDATE_EXPENSES_SORT_PROPERTY: 'Nobt.UPDATE_EXPENSES_SORT_PROPERTY',
  SET_CREATE_EXPENSE_MODAL_VISIBILITY: 'Nobt.SET_CREATE_EXPENSE_MODAL_VISIBILITY',
  CREATE_EXPENSE: 'Nobt.CREATE_EXPENSE',
  UPDATE_CREATE_EXPENSE_EDIT_STATE: 'Nobt.UPDATE_CREATE_EXPENSE_EDIT_STATE'
};


export const nobtActionFactory = {
  loadNobt: (id) => {
    return (dispatch, getState) => {
      getNobt(id).then(response => {
        dispatch({type: actionNames.SET_NOBT, payload: {nobt: response.data}});
      }, error => {
        //TODO: error handling
      });
    }
  },
  changeTab: (tabName) => ({type: actionNames.CHANGE_TAB, payload: {tabName: tabName}}),

  updateExpensesFilter: (filter) => ( {type: actionNames.UPDATE_EXPENSES_FILTER, payload: {filter: filter}} ),
  updateExpenseSortProperty: (property) => ( {
    type: actionNames.UPDATE_EXPENSES_SORT_PROPERTY,
    payload: {property: property}
  } ),

  setCreateExpenseModalVisibilty: (visibility) => ({
    type: actionNames.SET_CREATE_EXPENSE_MODAL_VISIBILITY,
    payload: {visibility}
  }),
  createExpense: (expense) => ({type: actionNames.CREATE_EXPENSE, payload: {expense}}),
  updateCreateExpenseEditState: (state) => ({type: actionNames.UPDATE_CREATE_EXPENSE_EDIT_STATE, payload: {state}}),
};

const actionHandlers = {
  [actionNames.SET_NOBT]: (state, action) => ({...state, currentNobt: action.payload.nobt}),
  [actionNames.CHANGE_TAB]: (state, action) => ({...state, activeTab: action.payload.tabName}),
  [actionNames.UPDATE_EXPENSES_FILTER]: (state, action) => ({...state, expenseFilter: action.payload.filter}),
  [actionNames.UPDATE_EXPENSES_SORT_PROPERTY]: (state, action) => ({
    ...state,
    expenseSortProperty: action.payload.property
  }),

  [actionNames.SET_CREATE_EXPENSE_MODAL_VISIBILITY]: (state, action) => {
    return {...state, createExpenseViewInfo: {...state.createExpenseViewInfo, show: action.payload.visibility}};
  },
  [actionNames.UPDATE_CREATE_EXPENSE_EDIT_STATE]: (state, action) => {

    var paidByPerson = action.payload.state.paidByPerson;
    var members = state.currentNobt.participatingPersons;

    if (members.indexOf(paidByPerson) < 0) {
      members.push(paidByPerson);
    }

    var newNobt = {...state.currentNobt, participatingPersons: members};

    return {
      ...state,
      newNobt,
      createExpenseViewInfo: {
        ...state.createExpenseViewInfo,
        state: {...state.createExpenseViewInfo.editstate, ...action.payload.state}
      }
    };
  },
};

const initialState = {
  currentNobt: {
    name: '',
    currency: '',
    participatingPersons: [],
    transactions: [],
    expenses: [],
  },

  activeTab: 'transactions',
  expenseFilter: '',
  expenseSortProperty: 'Date',

  createExpenseViewInfo: {
    show: true, state: {
      subject: "",
      creationDate: new Date(),
      selectedPersons: [],
      paidByPerson: "",
      amount: 0
    }
  }
};

export default function nobtReducer(state = initialState, action) {
  const handler = actionHandlers[ action.type ];
  return handler ? handler(state, action) : state
}
