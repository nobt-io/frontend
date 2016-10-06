import { createSelector } from "reselect";

export const getSelectedCurrency = (state) => state.NewNobt.selectedCurrency;
export const getChosenName = (state) => state.NewNobt.chosenName;
export const getPersonNames = (state) => state.NewNobt.personNames;

export const isEvilTwinFactory = createSelector([ getPersonNames ], names => {
  return (candidate) => names.indexOf(candidate) > -1;
});
