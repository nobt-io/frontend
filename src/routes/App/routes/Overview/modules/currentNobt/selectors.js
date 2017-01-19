import { createSelector } from "reselect";
import _debug from "debug";

import PersonDebtSummaryFactory from "./PersonDebtSummaryFactory";
import { getBillFilter, getBillSortProperty } from "../viewState/selectors"

const getCurrentNobt = (state) => state.App.currentNobt.data;

export const getName = createSelector([ getCurrentNobt ], (nobt) => nobt.name);
export const getMembers = createSelector([ getCurrentNobt ], (nobt) => nobt.participatingPersons);
export const getCurrency = createSelector([ getCurrentNobt ], (nobt) => nobt.currency);
export const getBills = createSelector([ getCurrentNobt ], (nobt) => nobt.bills);
export const getTransactions = createSelector([ getCurrentNobt ], (nobt) => nobt.transactions);
export const getAddBillStatus = (state) => state.App.currentNobt.addBillStatus;

export const getDebtSummaries = createSelector([ getTransactions, getMembers ], (transactions, members) => {
  var factory = new PersonDebtSummaryFactory(transactions);
  return members
    .map(m => factory.computeSummaryForPerson(m))
    .filter(s => s.me.amount !== 0); // we do not want debt summaries with value 0
});

export const getFilteredBills = createSelector([ getBills, getBillFilter, getBillSortProperty ], (bills, filter, sort) => {

  const NO_FILTER = '';
  const NO_SORT = () => 0;

  const sortFunctions = {
    "Amount": (e1, e2) => e2.debtee.amount - e1.debtee.amount,
    "Date": (e1, e2) => new Date(e2.date).getTime() - new Date(e1.date).getTime()
  };

  var matchName = (name) => (filter === NO_FILTER) ? true : name === filter;

  var matchDebtee = (bill) => matchName(bill.debtee);
  var matchDebtors = (bill) => bill.debtors.map( d => d.name).filter(matchName).length > 0;

  const filteredAndSortedBills = bills
    .map(e => {

      const debteeName = e.debtee;
      const sumOfShares = sumBill(e);

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
    })
    .filter(bill => (matchDebtee(bill) || matchDebtors(bill)))
    .sort(sortFunctions[ sort ] || NO_SORT);

  _debug('selectors:getFilteredBills')(filteredAndSortedBills);

  return filteredAndSortedBills;

});

export const getTotal = createSelector([ getBills ], (bills) => {
  const nobtTotal = bills.map(sumBill).reduce((sum, current) => sum + current, 0);

  _debug('selectors:getTotal')(`Nobt total: ${nobtTotal}.`);

  return nobtTotal;
});

const sumBill = (bill) => bill.shares.map(share => share.amount).reduce((sum, amount) => sum + amount);
