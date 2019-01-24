import { createSelector } from 'reselect';

import {
  canCreateNobt,
  getPersonToAdd,
  isNameOfPersonToAddADuplicate,
  isNameOfPersonToAddPresent,
} from './selectors';

export const isAddPersonButtonDisabled = isNameOfPersonToAddADuplicate;
export const shouldRenderAddPersonButton = isNameOfPersonToAddPresent;

export const isCreateNobtButtonDisabled = createSelector(
  canCreateNobt,
  canCreateNobt => !canCreateNobt
);
export const getAddPersonButtonLabel = createSelector(
  getPersonToAdd,
  personToAdd => `Add '${personToAdd}'`
);
