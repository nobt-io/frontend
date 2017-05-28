import Client from "../../../../../../api/api";
import AsyncActionStatus from "../../../../../../const/AsyncActionStatus";

export const UPDATE_ADD_BILL_STATUS = 'UPDATE_ADD_BILL_STATUS';
export const NEW_DEBTEE_SELECTED = 'NEW_DEBTEE_SELECTED';
export const NEW_MEMBER_ADDED = 'NEW_MEMBER_ADDED';

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

export function newDebteeSelected(member) {
  return {
    type: NEW_DEBTEE_SELECTED,
    payload: {
      debtee: member
    }
  }
}

export function newMemberAdded(member) {
  return {
    type: NEW_MEMBER_ADDED,
    payload: {
      member
    }
  }
}

export function addBill(nobtId, bill) {

  return async (dispatch) => {

    dispatch(addBillStarted());

    try {
      const response = await Client.createBill(nobtId, bill);
      dispatch(addBillSucceeded(response))
    } catch (error) {
      dispatch(addBillFailed(error))
    }
  }
}
