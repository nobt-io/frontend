import {getNobt} from 'api/api';
import PersonDebtSummaryFactory from './PersonDebtSummaryFactory'
import debug from 'debug';

const actionNames = {
  LOAD_NOBT: 'Nobt.LOAD_NOBT',
  SET_NOBT: 'Nobt.SET_NOBT',
};


export const actionFactory = {
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

export const actionHandlers = {
  [actionNames.SET_NOBT]: (state, action) => {

    var total = action.payload.nobt.expenses.reduce((total, expense) => total + expense.shares.reduce((expenseTotal, share) => expenseTotal + share.amount, 0), 0);
    var name = action.payload.nobt.name;
    var members = action.payload.nobt.participatingPersons;
    var expenses = action.payload.nobt.expenses;

    var transactionFactory = new PersonDebtSummaryFactory(action.payload.nobt.transactions);
    var transactions = members.map(m => transactionFactory.computeSummaryForPerson(m));

    return {...state, name : name, total: total, members: members, transactions: transactions, expenses: expenses};
  }
};
