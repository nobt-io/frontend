import { createSelector } from "reselect";
import _debug from "debug";
import PersonDebtSummaryFactory from "./PersonDebtSummaryFactory";

const getNobt = (state) => state.Nobt.currentNobt;
const getExpensesFilter = (state) => state.Nobt.expenseFilter;
const getExpensesSortProperty = (state) => state.Nobt.expenseSortProperty;
const getActiveTab = (state) => state.Nobt.activeTab;

export const getName = createSelector([ getNobt ], (nobt) => nobt.name);
export const getMembers = createSelector([ getNobt ], (nobt) => nobt.participatingPersons);
export const getCurrency = createSelector([ getNobt ], (nobt) => nobt.currency);
export const getExpenses = createSelector([ getNobt ], (nobt) => nobt.expenses);
export const getTransactions = createSelector([ getNobt ], (nobt) => nobt.transactions);

export const getActiveTabIndex = createSelector( [getActiveTab], activeTabName => {

  var tabNameIndexMapping = {
    'transactions': 0,
    'expenses': 1
  };

  const newTabIndex = tabNameIndexMapping[activeTabName] || 0;

  _debug('selectors:getActiveTabIndex')(`New tab index '${newTabIndex}' calculated from '${activeTabName}'.`);

  return newTabIndex;
});

export const getDebtSummaries = createSelector([ getTransactions, getMembers ], (transactions, members) => {
  var factory = new PersonDebtSummaryFactory(transactions);
  return members
    .map(m => factory.computeSummaryForPerson(m))
    .filter( s => s.me.amount !== 0 ); // we do not want debt summaries with value 0
});

export const getFilteredExpenses = createSelector([ getExpenses, getExpensesFilter, getExpensesSortProperty ], (expenses, filter, sort) => {

  const NO_FILTER = '';
  const NO_SORT = () => 0;

  const sortFunctions = {
    "AMOUNT": (e1, e2) => e1.debtee.amount - e2.debtee.amount,
  };

  var matchName = (name) => (filter === NO_FILTER) ? true : name === filter;

  var matchDebtee = (expense) => matchName(expense.debtee.name);
  var matchDebtors = (expense) => expense.debtors.filter(matchName).length > 0;

  return expenses
    .filter(e => (matchDebtee(e) || matchDebtors(e)))
    .sort(sortFunctions[ sort ] || NO_SORT);

});

export const getTotal = createSelector([ getExpenses, getCurrency ], (expenses, currency) => {
  return expenses.map(e => sumExpenseInCurrency(e, currency)).reduce((sum, current) => sum + current, 0);
});

const sumExpenseInCurrency = (expense, currency) => {

  var logger = _debug('selectors:sumExpenseInCurrency');

  var conversionFunction;

  if (currency !== currency) {
    logger(`Given currency ${currency} is different from ${currency}. Amounts will be converted.`);
    conversionFunction = (amount) => amount * expense.rate;
  } else {
    _debug(`Given currency ${currency} is equal to currency ${currency}. Amounts will not be converted.`);
    conversionFunction = (amount) => amount;
  }

  var sum = this._shares.map(share => share.amount).map(conversionFunction).reduce((sum, amount) => sum + amount);

  logger(`Total amount calculated: ${sum}`);

  return sum;
};
