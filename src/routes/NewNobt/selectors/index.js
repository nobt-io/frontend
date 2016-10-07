import { createSelector } from "reselect";

export const getSelectedCurrency = (state) => state.NewNobt.selectedCurrency;
export const getChosenName = (state) => state.NewNobt.chosenName;
export const getPersonNames = (state) => state.NewNobt.personNames;

export const isEvilTwinFactory = createSelector([ getPersonNames ], names => {
  return (candidate) => names.indexOf(candidate) > -1;
});

export const isNameValid = createSelector([ getChosenName ], name => name !== undefined && name.length > 0);
export const arePersonNamesValid = createSelector([ getPersonNames ], names => names !== undefined && names.length > 0);
export const isStateValid = createSelector([ isNameValid, arePersonNamesValid ], (isNameValid, arePersonsValid) => isNameValid && arePersonsValid);
