import { createSelector } from "reselect";
import PersonDebtSummaryFactory from "./PersonDebtSummaryFactory";
import SelectedPersonFactory from "./SelectedPersonFactory";
import _debug from "debug";

const getNobt = (state) => state.Nobt.currentNobt;
const getActiveTab = (state) => state.Nobt.activeTab;
export const getBillFilter = (state) => state.Nobt.billFilter;
export const getBillSortProperty = (state) => state.Nobt.billSortProperty;
export const getNewBillViewInfo = (state) => state.Nobt.newBillViewInfo;

export const getName = createSelector([ getNobt ], (nobt) => nobt.name);
export const getMembers = createSelector([ getNobt ], (nobt) => nobt.participatingPersons);
export const getCurrency = createSelector([ getNobt ], (nobt) => nobt.currency);
export const getBills = createSelector([ getNobt ], (nobt) => nobt.bills);
export const getTransactions = createSelector([ getNobt ], (nobt) => nobt.transactions);

export const getActiveTabIndex = createSelector([ getActiveTab ], activeTabName => {

  var tabNameIndexMapping = {
    'transactions': 0,
    'bills': 1
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

export const getFilteredBills = createSelector([ getBills, getBillFilter, getBillSortProperty ], (bills, filter, sort) => {

  const NO_FILTER = '';
  const NO_SORT = () => 0;

  const sortFunctions = {
    "Amount": (e1, e2) => e2.debtee.amount - e1.debtee.amount,
    "Date": (e1, e2) => new Date(e2.date).getTime() - new Date(e1.date).getTime()
  };

  var matchName = (name) => (filter === NO_FILTER) ? true : name === filter;

  var matchDebtee = (bill) => matchName(bill.debtee);
  var matchDebtors = (bill) => bill.shares.map( s => s.debtor ).filter(matchName).length > 0;

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
    .filter(e => (matchDebtee(e) || matchDebtors(e)))
    .sort(sortFunctions[ sort ] || NO_SORT);

  _debug('selectors:getFilteredBills')(filteredAndSortedBills);

  return filteredAndSortedBills;

});

export const getTotal = createSelector([ getBills ], (bills) => {
	const nobtTotal = bills.map(sumBill).reduce((sum, current) => sum + current, 0);

  _debug('selectors:getTotal')(`Nobt total: ${nobtTotal}.`);

  return nobtTotal;
});

export const getNewBillMetaData = createSelector([getNewBillViewInfo], (newBill) => {

  const metaDataIsValid =
    (newBill.subject || "").length !== 0 &&
    (newBill.amount || 0) > 0;

  return {
    active: newBill.show,
    subject: newBill.subject,
    amount: newBill.amount,
    paidByPerson: newBill.paidByPerson,
    creationDate: newBill.creationDate,
    splitStrategy: newBill.splitStrategy,
    metaDataIsValid: metaDataIsValid
  };
});

export const getNewBillPersonData = createSelector([getNewBillViewInfo], (createBill) => {

  var strategy = createBill.splitStrategy;

  var persons = createBill.involvedPersons[strategy];
  var amount = createBill.amount;

  var personFactory = new SelectedPersonFactory(strategy);
  var billPersonData = personFactory.getInvolvedPersonData(persons, amount);

  _debug('selectors:getNewBillPersonData')(billPersonData);

  return billPersonData;

});

const sumBill = (bill) => bill.shares.map(share => share.amount).reduce((sum, amount) => sum + amount);
