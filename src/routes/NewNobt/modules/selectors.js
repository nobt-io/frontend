import { createSelectorWithChangeCallback } from 'reselect-change-memoize';

import _debug from "debug";

function createSelector(loggerName, ...args) {
  return createSelectorWithChangeCallback((lastArgs, lastResult, newArgs, newResult) => {

    _debug(`selector:${loggerName}`)(`(${newArgs}) => ${newResult}`)

  }, ...args);
}
const getNewNobtSlice = (state) => state.newNobtForm;

export const getSelectedCurrency = createSelector([getNewNobtSlice], (state) => state.selectedCurrency);
export const getChosenName = createSelector([getNewNobtSlice], (state) => state.chosenName);
export const getPersonNames = createSelector([getNewNobtSlice], (state) => state.personNames);

export const getCreationStatus = createSelector([getNewNobtSlice], (state) => state.createNobtStatus);
export const getCreatedNobtId = createSelector([getNewNobtSlice], (state) => state.createdNobtId);

export const isNameValid = createSelector("isNameValid", [ getChosenName ], name => name !== undefined && name.length > 0);
export const arePersonNamesValid = createSelector("arePersonNamesValid", [ getPersonNames ], names => names !== undefined && names.length > 0);
export const  canCreateNobt = createSelector("canCreateNobt", [ isNameValid, arePersonNamesValid ], (isNameValid, arePersonsValid) => isNameValid && arePersonsValid);

// different from the other selectors, as it returns a function and not an object
export const isEvilTwinFactory = createSelector("isEvilTwinFactory", [ getPersonNames ], names => {
  return (candidate) => names.indexOf(candidate) > -1;
});

