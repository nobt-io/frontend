import {getNobt} from 'api/api';
import PersonDebtSummaryFactory from './PersonDebtSummaryFactory'

const actionNames = {
  LOAD_NOBT: 'Nobt.LOAD_NOBT',
  SET_NOBT: 'Nobt.SET_NOBT',
  CHANGE_TAB: 'Nobt.CHANGE_TAB',
};


export const nobtActionFactory = {
  changeTab: (tabIndex) => ({type: actionNames.CHANGE_TAB, payload: {tabIndex: tabIndex}}),

  loadNobt: (id) => {
    return (dispatch, getState) => {
      getNobt(id).then(response => {
        dispatch({type: actionNames.SET_NOBT, payload: {nobt: response.data}});
      }, error => {
        //TODO: error handling
      });
    }
  }
};

const actionHandlers = {
  [actionNames.SET_NOBT]: (state, action) => {

    var total = action.payload.nobt.expenses.reduce((total, expense) => total + expense.shares.reduce((expenseTotal, share) => expenseTotal + share.amount, 0), 0);
    var name = action.payload.nobt.name;
    var members = action.payload.nobt.participatingPersons;
    var expenses = action.payload.nobt.expenses;

    var transactionFactory = new PersonDebtSummaryFactory(action.payload.nobt.transactions);
    var transactions = members.map(m => transactionFactory.computeSummaryForPerson(m));

    return {...state, name : name, total: total, members: members, transactions: transactions, expenses: expenses};
  },
  [actionNames.CHANGE_TAB]: (state, action) => {
    var tabIndex = action.payload.tabIndex;

    return {...state, tabIndex : tabIndex};
  }
};

export const initialState = {
  total: 0,
  name: '',
  member: []
};

export default function nobtReducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
