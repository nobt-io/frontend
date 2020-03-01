import { createSelectorWithChangeCallback } from 'reselect-change-memoize';
import { createSelector } from 'reselect';
//
// function createSelector(loggerName, ...args) {
//   return createSelectorWithChangeCallback((lastArgs, lastResult, newArgs, newResult) => {
//
//     _debug(`selector:${loggerName}`)(`(${newArgs}) => ${newResult}`)
//
//   }, ...args);
// }

const getNewNobtSlice = state => state.createNobtForm;

export const getCurrency = createSelector(
  [getNewNobtSlice],
  state => state.selectedCurrency
);
export const getNobtName = createSelector(
  [getNewNobtSlice],
  state => state.chosenName
);
export const getPersonNames = createSelector(
  [getNewNobtSlice],
  state => state.personNames
);
export const getPersonToAdd = createSelector(
  [getNewNobtSlice],
  state => state.personToAdd
);

export const isNameOfPersonToAddADuplicate = createSelector(
  [getPersonToAdd, getPersonNames],
  (personToAdd, names) => {
    let trimmedName = personToAdd.trim();

    return !!trimmedName && names.indexOf(trimmedName) !== -1;
  }
);

export const isNameOfPersonToAddPresent = createSelector(
  [getNewNobtSlice],
  state => state.personToAdd.trim().length > 0
);

export const getCreationStatus = createSelector(
  [getNewNobtSlice],
  state => state.createNobtStatus
);
export const getCreatedNobtId = createSelector(
  [getNewNobtSlice],
  state => state.createdNobtId
);

export const isNameValid = createSelector(
  [getNobtName],
  name => name !== undefined && name.length > 0
);
export const arePersonNamesValid = createSelector(
  [getPersonNames],
  names => names !== undefined && names.length > 0
);
export const canCreateNobt = createSelector(
  [isNameValid, arePersonNamesValid],
  (isNameValid, arePersonsValid) => isNameValid && arePersonsValid
);

// different from the other selectors, as it returns a function and not an object
export const isEvilTwinFactory = createSelector([getPersonNames], names => {
  return candidate => names.indexOf(candidate) > -1;
});
