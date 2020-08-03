import Client from '../../../api';
import { AsyncActionStatus } from '../../../const/AsyncActionStatus';
import { getCurrency, getNobtName, getPersonNames } from './selectors';

export const UPDATE_CREATE_NOBT_STATUS = 'NewNobt.UPDATE_CREATE_NOBT_STATUS';

export const SELECT_CURRENCY = 'NewNobt.SELECT_CURRENCY';
export const CHANGE_NOBT_NAME = 'NewNobt.CHANGE_NOBT_NAME';
export const ADD_PERSON = 'NewNobt.ADD_PERSON';
export const REMOVE_PERSON = 'NewNobt.REMOVE_PERSON';
export const UPDATE_NAME_OF_PERSON_TO_ADD =
  'NewNobt.UPDATE_NAME_OF_PERSON_TO_ADD';

function createNobtStarted() {
  return {
    type: UPDATE_CREATE_NOBT_STATUS,
    payload: {
      status: AsyncActionStatus.IN_PROGRESS,
    },
  };
}

function createNobtSucceeded(response) {
  return {
    type: UPDATE_CREATE_NOBT_STATUS,
    payload: {
      id: response.data.id,
      status: AsyncActionStatus.SUCCESSFUL,
    },
  };
}

function createNobtFailed(error) {
  return {
    type: UPDATE_CREATE_NOBT_STATUS,
    payload: {
      error,
      status: AsyncActionStatus.FAILED,
    },
  };
}

export function createNobt() {
  return (dispatch, getState) => {
    dispatch(createNobtStarted());

    let nobtToCreate = {
      nobtName: getNobtName(getState()),
      currency: getCurrency(getState()),
      explicitParticipants: getPersonNames(getState()),
    };

    Client.createNobt(nobtToCreate).then(
      response => {
        dispatch(createNobtSucceeded(response));
      },
      error => dispatch(createNobtFailed(error))
    );
  };
}

export function selectCurrency(newCurrency) {
  return {
    type: SELECT_CURRENCY,
    payload: {
      newCurrency,
    },
  };
}

export function changeNobtName(newName) {
  return {
    type: CHANGE_NOBT_NAME,
    payload: {
      newName,
    },
  };
}

export function addCurrentNameAsPerson() {
  return {
    type: ADD_PERSON,
  };
}

export function removePerson(name) {
  return {
    type: REMOVE_PERSON,
    payload: {
      name,
    },
  };
}

export function updateNameOfPersonToAdd(name) {
  return {
    type: UPDATE_NAME_OF_PERSON_TO_ADD,
    payload: {
      name,
    },
  };
}
