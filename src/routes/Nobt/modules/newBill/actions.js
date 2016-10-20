import Client from "api/api"

export const ADD_BILL_STARTED = 'Nobt.ADD_BILL_STARTED';
export const ADD_BILL_SUCCEEDED = 'Nobt.ADD_BILL_SUCCEEDED';
export const ADD_BILL_FAILED = 'Nobt.ADD_BILL_FAILED';

export const SET_NEW_BILL_OVERLAY_VISIBILITY = 'Nobt.SET_NEW_BILL_OVERLAY_VISIBILITY';
export const SET_NEW_BILL_PERSON_VALUE = 'Nobt.SET_NEW_BILL_PERSON_VALUE';

function addBillStarted(bill) {
  return {
    type: ADD_BILL_STARTED,
    payload: {
      bill
    }
  }
}

function addBillSucceeded(response) {
  return {
    type: ADD_BILL_SUCCEEDED,
    payload: {
      nobt: response.data
    }
  }
}

function addBillFailed(error) {
  return {
    type: ADD_BILL_FAILED,
    payload: {
      error
    }
  }
}



export function addBill(nobtId, bill) {

  return (dispatch) => {

    dispatch(addBillStarted(bill));

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
