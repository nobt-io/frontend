import { createSelector } from 'reselect';
import {
  balanceDetailPathVariable,
  billDetailPathVariable,
} from '../../../../app';
import { sumShares } from '../../../../nobt';

export const getCurrentNobt = state => state.App.currentNobt.data;
const getNobtFetchTimestamp = state => state.App.currentNobt.nobtFetchTimestamp;

export const getBills = createSelector([getCurrentNobt], nobt => nobt.bills);

export const getPayments = createSelector(
  [getCurrentNobt],
  nobt => nobt.payments
);

export const isNobtEmpty = createSelector(
  [getBills],
  bills => bills.length === 0
);
export const isNobtDataOutdated = createSelector(
  [getNobtFetchTimestamp],
  timestamp => timestamp === null
);

export const getDeNormalizedBills = createSelector([getBills], bills =>
  bills.map(deNormalizeBill)
);

const getBillsAsFeedItems = createSelector([getDeNormalizedBills], bills =>
  bills.map(bill => ({
    id: bill.id,
    type: 'bill',
    date: bill.createdOn,
    amount: bill.debtee.amount,
    debtee: bill.debtee.name,
    subject: bill.name,
    deleted: !!bill.deletedOn,
    deletedOn: bill.deletedOn,
  }))
);

const getPaymentsAsFeedItems = createSelector([getPayments], payments =>
  payments.map(payment => ({
    id: payment.id,
    type: 'payment',
    date: payment.createdOn,
    amount: payment.amount,
    sender: payment.sender,
    recipient: payment.recipient,
  }))
);

// How to sort dates: https://stackoverflow.com/a/10124053
let newestFirstComparator = function(leftFeedItem, rightFeedItem) {
  const rightDate = new Date(rightFeedItem.date);
  const leftDate = new Date(leftFeedItem.date);

  // We want newest first -> subtract right from left date
  return rightDate - leftDate;
};

export const getSortedFeedItems = createSelector(
  [getBillsAsFeedItems, getPaymentsAsFeedItems],
  (billFeedItems, paymentFeedItems) => {
    return [...billFeedItems, ...paymentFeedItems].sort(newestFirstComparator);
  }
);

const deNormalizeBill = e => {
  const debteeName = e.debtee;
  const sumOfShares = sumShares(e.shares);

  const debtors = e.shares.map(share => ({
    name: share.debtor,
    amount: share.amount,
  }));

  return {
    id: e.id,
    name: e.name,
    date: e.date,
    createdOn: e.createdOn,
    debtee: {
      name: debteeName,
      amount: sumOfShares,
    },
    conversionInformation: e.conversionInformation,
    debtors: debtors,
    actions: e._links,
    deletedOn: e.deletedOn,
  };
};

const getBalanceOwner = (state, props) =>
  props.match.params[balanceDetailPathVariable];

export const getSumOfPaidBills = paidBills => {
  return paidBills.reduce((amount, bill) => amount + bill.debtee.amount, 0);
};

export const makeGetPaidBills = () =>
  createSelector([getBills, getBalanceOwner], (bills, balanceOwner) => {
    return bills
      .filter(bill => bill.debtee === balanceOwner)
      .map(deNormalizeBill);
  });

export const makeGetRelatedBills = () =>
  createSelector([getBills, getBalanceOwner], (bills, balanceOwner) => {
    return bills
      .filter(
        bill =>
          bill.shares.map(share => share.debtor).indexOf(balanceOwner) !== -1
      )
      .map(deNormalizeBill);
  });
