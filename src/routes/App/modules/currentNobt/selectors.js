import { createSelector } from 'reselect';
import _debug from 'debug';
import PersonBalanceFactory from './PersonBalanceFactory';
import { AsyncActionStatus } from '../../../../const/AsyncActionStatus';
import { balanceDetailPathVariable, billDetailPathVariable } from '../../index';

export const getCurrentNobt = state => state.App.currentNobt.data;
const getNobtFetchTimestamp = state => state.App.currentNobt.nobtFetchTimestamp;
export const getFetchNobtStatus = state =>
  state.App.currentNobt.fetchNobtStatus;

export const getName = createSelector(
  [getCurrentNobt],
  nobt => nobt.name
);
export const getMembers = createSelector(
  [getCurrentNobt],
  nobt => nobt.participatingPersons
);
export const getNobtCurrency = createSelector(
  [getCurrentNobt],
  nobt => nobt.currency
);
export const getBills = createSelector(
  [getCurrentNobt],
  nobt => nobt.bills
);
export const getTransactions = createSelector(
  [getCurrentNobt],
  nobt => nobt.transactions
);
export const getCreatedOn = createSelector(
  [getCurrentNobt],
  nobt => nobt.createdOn
);
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

export const shouldFetchNobt = createSelector(
  [isNobtDataOutdated, getFetchNobtStatus],
  (isOutdated, status) => {
    return isOutdated && status !== AsyncActionStatus.IN_PROGRESS;
  }
);

export const getDeNormalizedBills = createSelector(
  [getBills],
  bills => bills.map(deNormalizeBill)
);

const getBillsAsFeedItems = createSelector(
  [getDeNormalizedBills],
  bills =>
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

const getPaymentsAsFeedItems = createSelector(
  [getPayments],
  payments =>
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

export const getBalances = createSelector(
  [getTransactions, getMembers],
  (transactions, members) => {
    const factory = new PersonBalanceFactory(transactions);
    return members.map(m => factory.computeBalanceForPerson(m));
  }
);

const deNormalizeBill = e => {
  const debteeName = e.debtee;
  const sumOfShares = sumBill(e);

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

let first = () => true;

const getBillId = (state, props) =>
  parseInt(props.match.params[billDetailPathVariable]);

export const makeGetBill = () =>
  createSelector(
    [getBills, getBillId],
    (bills, billId) => {
      return bills
        .filter(bill => bill.id === billId)
        .map(deNormalizeBill)
        .find(first);
    }
  );

export const makeCanBillBeDeleted = () =>
  createSelector(
    [getBills, getBillId],
    (bills, billId) => {
      var bill = bills.filter(bill => bill.id === billId).find(first);

      if (!bill) {
        return false;
      }

      if (!bill.hasOwnProperty('_links')) {
        return false;
      }

      return bill._links.hasOwnProperty('delete');
    }
  );

const getBalanceOwner = (state, props) =>
  props.match.params[balanceDetailPathVariable];

export const makeGetBalance = () =>
  createSelector(
    [getBalances, getBalanceOwner],
    (balances, balanceOwner) => {
      return balances
        .filter(balance => sanitizeName(balance.me.name) === balanceOwner)
        .find(first);
    }
  );

// quickfix for bug 277
function sanitizeName(name) {
  return name.trim();
}

export const getSumOfPaidBills = paidBills => {
  return paidBills.reduce((amount, bill) => amount + bill.debtee.amount, 0);
};

export const makeGetPaidBills = () =>
  createSelector(
    [getBills, getBalanceOwner],
    (bills, balanceOwner) => {
      return bills
        .filter(bill => bill.debtee === balanceOwner)
        .map(deNormalizeBill);
    }
  );

export const makeGetRelatedBills = () =>
  createSelector(
    [getBills, getBalanceOwner],
    (bills, balanceOwner) => {
      return bills
        .filter(
          bill =>
            bill.shares.map(share => share.debtor).indexOf(balanceOwner) !== -1
        )
        .map(deNormalizeBill);
    }
  );

export const getTotal = createSelector(
  [getBills],
  bills => {
    const nobtTotal = bills
      .map(sumBill)
      .reduce((sum, current) => sum + current, 0);

    _debug('selectors:getTotal')(`Nobt total: ${nobtTotal}.`);

    return nobtTotal;
  }
);

const sumBill = bill =>
  bill.shares.map(share => share.amount).reduce((sum, amount) => sum + amount);
