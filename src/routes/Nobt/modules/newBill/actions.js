import Client from "api/api"

import AsyncActionStatus from "const/AsyncActionStatus"

export const UPDATE_ADD_BILL_STATUS = 'Nobt.UPDATE_ADD_BILL_STATUS';

export const SET_NEW_BILL_OVERLAY_VISIBILITY = 'Nobt.SET_NEW_BILL_OVERLAY_VISIBILITY';
export const SET_NEW_BILL_PERSON_VALUE = 'Nobt.SET_NEW_BILL_PERSON_VALUE';

function addBillStarted() {
  return {
    type: UPDATE_ADD_BILL_STATUS,
    payload: {
      status: AsyncActionStatus.IN_PROGRESS
    }
  }
}

function addBillSucceeded(response) {
  return {
    type: UPDATE_ADD_BILL_STATUS,
    payload: {
      response,
      status: AsyncActionStatus.SUCCESSFUL
    }
  }
}

function addBillFailed(error) {
  return {
    type: UPDATE_ADD_BILL_STATUS,
    payload: {
      error,
      status: AsyncActionStatus.FAILED
    }
  }
}



export function addBill(nobtId, bill) {

  return (dispatch) => {

    dispatch(addBillStarted());

    Client.createBill(nobtId, bill).then(
      response => dispatch(addBillSucceeded(response)),
      error => dispatch(addBillFailed(error))
    )
  }
}

export function setNewBillOverlayVisibility(visibility) {
  return {type: SET_NEW_BILL_OVERLAY_VISIBILITY, payload: {visibility}}
}

export function setNewBillPersonValue(name, value) {
  return {type: SET_NEW_BILL_PERSON_VALUE, payload: {name, value}}
}
