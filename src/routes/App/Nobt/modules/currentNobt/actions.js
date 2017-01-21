import Client from "../../../../../api/api";
import AsyncActionStatus from "../../../../../const/AsyncActionStatus"

export const UPDATE_FETCH_NOBT_STATUS = 'Nobt.UPDATE_FETCH_NOBT_STATUS';
export const UPDATE_ADD_BILL_STATUS = 'Nobt.UPDATE_ADD_BILL_STATUS';
export const INVALIDATE_NOBT = 'Nobt.INVALIDATE';

function fetchNobtStarted() {
  return {
    type: UPDATE_FETCH_NOBT_STATUS,
    payload: {
      status: AsyncActionStatus.IN_PROGRESS
    }
  }
}

function fetchNobtSucceeded(response) {
  return {
    type: UPDATE_FETCH_NOBT_STATUS,
    payload: {
      nobt: response.data,
      status: AsyncActionStatus.SUCCESSFUL
    }
  }
}

function fetchNobtFailed(error) {
  return {
    type: UPDATE_FETCH_NOBT_STATUS,
    payload: {
      error,
      status: AsyncActionStatus.FAILED
    }
  }
}

export function fetchNobt(id) {

  return (dispatch) => {

    dispatch(fetchNobtStarted());

    Client.fetchNobt(id).then(
      response => dispatch(fetchNobtSucceeded(response)),
      error => dispatch(fetchNobtFailed(error))
    )
  }
}

export function invalidateNobt() {
  return {
    type: INVALIDATE_NOBT
  }
}

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

export const ADD_MEMBER = 'Nobt.ADD_MEMBER';

export function addMember(name) {
  return {
    type: ADD_MEMBER,
    payload: {
      name
    }
  }
}
