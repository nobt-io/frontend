import { createSelector } from "reselect";

import { canCreateNobt, getPersonToAdd, isNameOfPersonToAddValid } from "./selectors";

export const shouldRenderAddPersonButton = isNameOfPersonToAddValid;
export const isCreateNobtButtonDisabled = createSelector(canCreateNobt, canCreateNobt => !canCreateNobt);
export const isAddPersonButtonDisabled = createSelector(isNameOfPersonToAddValid, isNameValid => !isNameValid);
export const getAddPersonButtonLabel = createSelector(getPersonToAdd, personToAdd => `Add '${personToAdd}'`);
