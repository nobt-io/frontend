import Client from "../../../../../../api/api";
import AsyncActionStatus from "../../../../../../const/AsyncActionStatus";

export const UPDATE_ADD_BILL_STATUS = 'UPDATE_ADD_BILL_STATUS';

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
