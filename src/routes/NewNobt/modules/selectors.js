import { createSelectorWithChangeCallback } from 'reselect-change-memoize';

import _debug from "debug";

function createSelector(loggerName, ...args) {
  return createSelectorWithChangeCallback((lastArgs, lastResult, newArgs, newResult) => {

    _debug(`selector:${loggerName}`)(`(${newArgs}) => ${newResult}`)

  }, ...args);
}

export const getSelectedCurrency = (state) => state.NewNobt.selectedCurrency;
export const getChosenName = (state) => state.NewNobt.chosenName;
export const getPersonNames = (state) => state.NewNobt.personNames;

export const getCreationStatus = (state) => state.NewNobt.createNobtStatus;
export const getCreatedNobtId = (state) => state.NewNobt.createdNobtId;


export const isNameValid = createSelector("isNameValid", [ getChosenName ], name => name !== undefined && name.length > 0);
export const arePersonNamesValid = createSelector("arePersonNamesValid", [ getPersonNames ], names => names !== undefined && names.length > 0);
export const  canCreateNobt = createSelector("canCreateNobt", [ isNameValid, arePersonNamesValid ], (isNameValid, arePersonsValid) => isNameValid && arePersonsValid);

// different from the other selectors, as it returns a function and not an object
export const isEvilTwinFactory = createSelector("isEvilTwinFactory", [ getPersonNames ], names => {
  return (candidate) => names.indexOf(candidate) > -1;
});

