import {getNobt} from 'api/api';
import PersonDebtSummaryFactory from './PersonDebtSummaryFactory'
import CurrencyFormatter from './CurrencyFormatter'
import PersonSummaryFactory from './PersonSummaryFactory'

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

    //ioc for the poor
    const currencyFormatter = new CurrencyFormatter("EUR");
    const personSummaryFactory = new PersonSummaryFactory(currencyFormatter);
    const transactionFactory = new PersonDebtSummaryFactory(action.payload.nobt.transactions, personSummaryFactory);

    const total = currencyFormatter.getCurrencyAmount(getTotal(action.payload.nobt.expenses));
    const name = action.payload.nobt.name;
    const members = action.payload.nobt.participatingPersons;
    const expenses = action.payload.nobt.expenses.map(e => getExpense(e, personSummaryFactory));

    var transactions = members.map(m => transactionFactory.computeSummaryForPerson(m));

    return {...state, name, total, members, transactions, expenses};
  }
};

const getTotal = (expenses) => {
  return expenses.reduce((total, expense) => total + expense.shares.reduce((expenseTotal, share) => expenseTotal + share.amount, 0), 0);
};

const getExpense = (expense, personSummaryFactory) => {
  const total = expense.shares.reduce((expenseTotal, share) => expenseTotal + share.amount, 0);

  const name = expense.name;
  const strategy = expense.splitStrategy;
  const debtee = personSummaryFactory.cratePersonSummary({name: expense.debtee, amount: total});
  const debtors = expense.shares.map(s => personSummaryFactory.createExpensePerson(s));

  return {name, strategy, debtee, debtors}
};
