import { createSelector } from "reselect";
import SplitStrategyNames from "const/SplitStrategyNames";
import { getMembers } from "../../../../modules/currentNobt/selectors";

const getAddBillFormSlice = (state) => state.App.addBillForm;

export const getAmount = createSelector([ getAddBillFormSlice ], (state) => state.amount);
export const getDebtee = createSelector([ getAddBillFormSlice ], (state) => state.debtee);
export const getDescription = createSelector([ getAddBillFormSlice ], (state) => state.description);
export const getAddBillStatus = createSelector([getAddBillFormSlice], state => state.addBillStatus);
export const getSplitStrategy = createSelector([ getAddBillFormSlice ], (state) => {
  return state.splitStrategy
});

export const getBillMembers = createSelector([ getAddBillFormSlice ], (state) => {
  return state.personValues.map(pv => pv.name)
});

export const getAllMembers = createSelector([ getBillMembers, getMembers, getDebtee ], (billMembers, nobtMembers, debtee) => {
  return [ ...new Set([ ...billMembers, ...nobtMembers, debtee ]) ].filter( name => name !== null )
});

const getDefaultValues = createSelector([ getAddBillFormSlice ], (state) => state.defaultValues);
const getDefaultValueForSplitStrategy = createSelector([ getSplitStrategy, getDefaultValues ], (splitStrategy, defaultValues) => defaultValues[ splitStrategy ]);

export const getPersonValues = createSelector([
  getAddBillFormSlice,
  getDefaultValueForSplitStrategy,
  getAllMembers,
  getBillMembers
], (state, defaultValue, members, billMembers) => {

  let hasExplicitPersonValue = name => billMembers.indexOf(name) !== -1;
  let createPersonValue = name => ({name: name, value: defaultValue});

  let defaultPersonValues = members.filter(name => !hasExplicitPersonValue(name)).map(createPersonValue);
  let existingPersonValues = state.personValues;

  return [...defaultPersonValues, ...existingPersonValues]
});

/**
 * Internal selector used to determine the "strategy" on how to split the bill. Listens on the splitStrategy property and therefore
 * gets executed every time, the user changes the strategy.
 */
const getShareSelector = createSelector([ getSplitStrategy ], splitStrategy => {
  switch (splitStrategy) {
    case SplitStrategyNames.EQUAL:
      return getEqualShares;

    case SplitStrategyNames.UNEQUAL:
      return getCustomShares;

    case SplitStrategyNames.PERCENTAGE:
      return getPercentualShares;

    default:

      throw new Error(`Unknown split-strategy '${splitStrategy}'.`);
  }
});

const getEqualShares = createSelector([ getAmount, getPersonValues, getAllMembers ], (amount, personValues, members) => {

  const noShare = (name) => { return {name: name, amount: null, value: false} };

  let involvedMembers = personValues.filter(pv => pv.value === true).map(pv => pv.name);

  if (involvedMembers.length === 0) {
    return members.map(noShare);
  }

  const share = Math.round(amount / involvedMembers.length * 100) / 100;
  const regularShare = (name) => { return {name: name, amount: share, value: true} };

  const isInvolved = (name) => involvedMembers.indexOf(name) !== -1;
  const mapFn = (name) => isInvolved(name) ? regularShare(name) : noShare(name);

  let shares = members.map(mapFn);

  const roundingError = amount - share * involvedMembers.length;
  shares.find(share => share.value === true).amount += roundingError;


  return shares;
});

const getCustomShares = createSelector([ getPersonValues ], (personValues) => {
  return personValues.map(pv => {
    return {
      name: pv.name,
      amount: pv.value || 0,
      value: pv.value
    }
  });
});

const getPercentualShares = createSelector([ getAmount, getPersonValues, getAllMembers ], (amount, personValues, members) => {

  const noShare = (name) => { return {name: name, amount: null, value: 0} };

  var involvedMembers = personValues.filter(pv => pv.value > 0).map(pv => pv.name);

  if (involvedMembers.length === 0) {
    return members.map(noShare);
  }

  var sumOfPercentages = personValues.reduce((sum, pv) => sum + pv.value, 0);

  const calculateAmount = (amount, percentage) => {
    var percentFactor = (percentage / 100);
    return Math.round(amount * percentFactor * 100) / 100;
  };

  var shares = personValues.map(pv => {
    return {
      name: pv.name,
      amount: calculateAmount(amount, pv.value),
      value: pv.value
    };
  });

  if (sumOfPercentages === 100) {
    const roundingError = (amount - shares.reduce((sum, c) => sum + c.amount, 0)) || 0;
    shares.find(share => share.value > 0).amount += roundingError;
  }

  return shares;
});


export const getShares = createSelector([ getShareSelector, (state) => state ], (shareSelector, state) => {

  var shares = shareSelector(state);
  return shares.sort(personNameComparator);
});

export const isValidBill = createSelector([ getShares, getAmount, getDescription, getDebtee ], (shares, amount, description, debtee) => {

  var isAmountGreaterThanZero = amount > 0;
  var isDescriptionNotEmpty = description.length > 0;
  var isDebteeSelected = debtee !== null;
  var hasAtLeastOneShareWithAmount = shares.filter(s => s.amount > 0).length;

  return isAmountGreaterThanZero && isDescriptionNotEmpty && isDebteeSelected && hasAtLeastOneShareWithAmount;
});

export const isExistingMemberFactory = createSelector( [ getAllMembers ], members => {
  return (candidate) => members.indexOf(candidate) >= 0;
});

export const personNameComparator = (first, second) => {
  return first.name.localeCompare(second.name)
};
