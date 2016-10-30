import { createSelector } from "reselect";
import SplitStrategyNames from "const/SplitStrategyNames";

export const getAmount = (state) => state.amount;
export const getDebtee = (state) => state.debtee;
export const getDescription = (state) => state.description;
export const getSplitStrategy = (state) => state.splitStrategy;
export const getPersonValues = (state) => state.personValues;

const getState = (state) => state;
const getAllMembers = (state) => state.personValues.map(pv => pv.name);

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

  var involvedMembers = personValues.filter(pv => pv.value === true).map(pv => pv.name);

  if (involvedMembers.length === 0) {
    return members.map(noShare);
  }

  const share = Math.round(amount / involvedMembers.length * 100) / 100;
  const regularShare = (name) => { return {name: name, amount: share, value: true} };

  const isInvolved = (name) => involvedMembers.indexOf(name) !== -1;
  const mapFn = (name) => isInvolved(name) ? regularShare(name) : noShare(name);

  var shares = members.map(mapFn);

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


export const getShares = createSelector([ getShareSelector, getState ], (shareSelector, state) => {

  var shares = shareSelector(state);
  return shares.sort(byName);
});


const byName = (first, second) => {
  return first.name > second.name
};
