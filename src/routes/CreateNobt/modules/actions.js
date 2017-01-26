import Client from "../../../api/api";
import AsyncActionStatus from "../../../const/AsyncActionStatus"
import utils from "utils"

export const UPDATE_CREATE_NOBT_STATUS = 'NewNobt.UPDATE_CREATE_NOBT_STATUS';

export const SELECT_CURRENCY = 'NewNobt.SELECT_CURRENCY';
export const CHANGE_NOBT_NAME = 'NewNobt.CHANGE_NOBT_NAME';
export const ADD_PERSON = 'NewNobt.ADD_PERSON';
export const REMOVE_PERSON = 'NewNobt.REMOVE_PERSON';

function createNobtStarted(id) {
  return {
    type: UPDATE_CREATE_NOBT_STATUS,
    payload: {
      status: AsyncActionStatus.IN_PROGRESS
    }
  }
}

function createNobtSucceeded(response) {
  return {
    type: UPDATE_CREATE_NOBT_STATUS,
    payload: {
      id: response.data.id,
      status: AsyncActionStatus.SUCCESSFUL
    }
  }
}

function createNobtFailed(error) {
  return {
    type: UPDATE_CREATE_NOBT_STATUS,
    payload: {
      error,
      status: AsyncActionStatus.FAILED
    }
  }
}

export function createNobt() {

  return (dispatch, getState) => {

    dispatch(createNobtStarted());

    var state = getState().NewNobt;

    var nobtToCreate = {
      nobtName: state.chosenName,
      currency: state.selectedCurrency,
      explicitParticipants: state.personNames
    };

    Client.createNobt(nobtToCreate).then(
      response => {

        utils.sleep(200).then(() => dispatch(createNobtSucceeded(response)));

      },
      error => dispatch(createNobtFailed(error))
    )
  }
}

export function selectCurrency(newCurrency) {
  return {
    type: SELECT_CURRENCY,
    payload: {
      newCurrency
    }
  }
}

export function changeNobtName(newName) {
  return {
    type: CHANGE_NOBT_NAME,
    payload: {
      newName
    }
  }
}
export function addPerson(name) {
  return {
    type: ADD_PERSON,
    payload: {
      name
    }
  }
}
export function removePerson(name) {
  return {
    type: REMOVE_PERSON,
    payload: {
      name
    }
  }
}
