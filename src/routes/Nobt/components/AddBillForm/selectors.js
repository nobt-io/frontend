import { createSelector } from "reselect";
import _debug from "debug";
import SplitStrategyNames from "const/SplitStrategyNames";

export const getAmount = (state) => state.amount;
export const getDebtee = (state) => state.debtee;
export const getDescription = (state) => state.description;
export const getSplitStrategy = (state) => state.splitStrategy;
export const getPersonValues = (state) => state.personValues;

const getState = (state) => state;
const getAllMembers = (state) => state.personValues.map(pv => pv.name);

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

  const logger = _debug("getEqualShares");
  const noShare = (name) => { return {name: name, amount: null, value: false} };

  var involvedMembers = personValues.filter(pv => pv.value === true).map(pv => pv.name);
  logger(`Involved members: ${involvedMembers}`);

  const isInvolved = (name) => involvedMembers.indexOf(name) !== -1;

  if (involvedMembers.length === 0) {
    return members.map(noShare);
  }

  const share = amount / involvedMembers.length;
  // const roundingError = amount - share * involvedMembers.length;

  const regularShare = (name) => { return {name: name, amount: share, value: true} };

  var shares = members.map(name => {
    if (isInvolved(name)) {
      return regularShare(name);
    } else {
      return noShare(name);
    }
  });

  logger(`Shares: ${shares}`);

  return shares;
});


const getCustomShares = null;
const getPercentualShares = null;


export const getShares = createSelector([ getShareSelector, getState ], (shareSelector, state) => {
  var shares = shareSelector(state);
  return shares.sort((first, second) => {
    return first.name > second.name
  });
});
