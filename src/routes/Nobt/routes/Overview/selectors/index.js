import { createSelector } from "reselect";
import _debug from "debug";
import PersonDebtSummaryFactory from "./PersonDebtSummaryFactory";

const getNobt = (state) => state.Nobt.currentNobt;
const getActiveTab = (state) => state.Nobt.activeTab;
export const getExpensesFilter = (state) => state.Nobt.expenseFilter;
export const getExpensesSortProperty = (state) => state.Nobt.expenseSortProperty;

export const getName = createSelector([ getNobt ], (nobt) => nobt.name);
export const getMembers = createSelector([ getNobt ], (nobt) => nobt.participatingPersons);
export const getCurrency = createSelector([ getNobt ], (nobt) => nobt.currency);
export const getExpenses = createSelector([ getNobt ], (nobt) => nobt.expenses);
export const getTransactions = createSelector([ getNobt ], (nobt) => nobt.transactions);

export const getActiveTabIndex = createSelector([ getActiveTab ], activeTabName => {

  var tabNameIndexMapping = {
    'transactions': 0,
    'expenses': 1
  };

  const newTabIndex = tabNameIndexMapping[ activeTabName ] || 0;

  _debug('selectors:getActiveTabIndex')(`New tab index '${newTabIndex}' calculated from '${activeTabName}'.`);

  return newTabIndex;
});

export const getDebtSummaries = createSelector([ getTransactions, getMembers ], (transactions, members) => {
  var factory = new PersonDebtSummaryFactory(transactions);
  return members
    .map(m => factory.computeSummaryForPerson(m))
    .filter(s => s.me.amount !== 0); // we do not want debt summaries with value 0
});

export const getFilteredExpenses = createSelector([ getExpenses, getExpensesFilter, getExpensesSortProperty ], (expenses, filter, sort) => {

  const NO_FILTER = '';
  const NO_SORT = () => 0;

  const sortFunctions = {
    "Amount": (e1, e2) => e1.debtee.amount - e2.debtee.amount,
  };

  var matchName = (name) => (filter === NO_FILTER) ? true : name === filter;

  var matchDebtee = (expense) => matchName(expense.debtee);
  var matchDebtors = (expense) => expense.shares.map( s => s.debtor ).filter(matchName).length > 0;

  const filteredAndSortedExpenses = expenses
    .filter(e => (matchDebtee(e) || matchDebtors(e)))
    .sort(sortFunctions[ sort ] || NO_SORT)
    .map(e => {

      const debteeName = e.debtee;
      const sumOfShares = sumExpense(e);

      const debtors = e.shares.map(share => ({name: share.debtor, amount: share.amount}));

      return {
        id: e.id,
        name: e.name,
        date: e.date,
        createdOn: e.createdOn,
        debtee: {
          name: debteeName,
          amount: sumOfShares
        },
        debtors: debtors
      };
    });

  _debug('selectors:getFilteredExpenses')(filteredAndSortedExpenses);

  return filteredAndSortedExpenses;

});

export const getTotal = createSelector([ getExpenses ], (expenses) => {
	const nobtTotal = expenses.map(sumExpense).reduce((sum, current) => sum + current, 0);

  _debug('selectors:getTotal')(`Nobt total: ${nobtTotal}.`);

  return nobtTotal;
});

const sumExpense = (expense) => expense.shares.map(share => share.amount).reduce((sum, amount) => sum + amount);
