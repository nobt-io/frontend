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

  return (dispatch) => {

    dispatch(addBillStarted());

    Client.createBill(nobtId, bill).then(
      response => dispatch(addBillSucceeded(response)),
      error => dispatch(addBillFailed(error))
    )
  }
}
