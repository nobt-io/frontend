import { createSelector } from "reselect";

export const getSelectedCurrency = (state) => state.NewNobt.selectedCurrency;
export const getChosenName = (state) => state.NewNobt.chosenName;
export const getPersonNames = (state) => state.NewNobt.personNames;

export const getCreationStatus = (state) => state.NewNobt.createNobtStatus;
export const getCreatedNobtId = (state) => state.NewNobt.createdNobtId;


export const isNameValid = createSelector([ getChosenName ], name => name !== undefined && name.length > 0);
export const arePersonNamesValid = createSelector([ getPersonNames ], names => names !== undefined && names.length > 0);
export const canCreateNobt = createSelector([ isNameValid, arePersonNamesValid ], (isNameValid, arePersonsValid) => isNameValid && arePersonsValid);

// different from the other selectors, as it returns a function and not an object
export const isEvilTwinFactory = createSelector([ getPersonNames ], names => {
  return (candidate) => names.indexOf(candidate) > -1;
});
