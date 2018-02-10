import Client from "../../../../../api/api";
import AsyncActionStatus from "../../../../../const/AsyncActionStatus";

export const UPDATE_ADD_BILL_STATUS = 'UPDATE_ADD_BILL_STATUS';
export const NEW_DEBTEE_SELECTED = 'NEW_DEBTEE_SELECTED';
export const NEW_MEMBER_ADDED = 'NEW_MEMBER_ADDED';
export const FOCUS_ID_CHANGED = 'FOCUS_ID_CHANGED';
export const AMOUNT_CHANGED = 'AMOUNT_CHANGED';
export const DESCRIPTION_CHANGED = 'DESCRIPTION_CHANGED';
export const SHARE_VALUE_CHANGED = 'SHARE_VALUE_CHANGED';
export const CLEAR_ADD_BILL_FORM = 'CLEAR_ADD_BILL_FORM';

const createMessage = (type, payload) => ({type, payload: {...payload}});

export const focusIdChanged = (focusId) => createMessage(FOCUS_ID_CHANGED, {focusId});
export const newMemberAdded = (member) => createMessage(NEW_MEMBER_ADDED, {member});
export const newDebteeSelected = (debtee) => createMessage(NEW_DEBTEE_SELECTED, {debtee});
export const addBillFailed = (error) => createMessage(UPDATE_ADD_BILL_STATUS, {error, status: AsyncActionStatus.FAILED});
export const addBillSucceeded = (response) => createMessage(UPDATE_ADD_BILL_STATUS, {response, status: AsyncActionStatus.SUCCESSFUL});
export const addBillStarted = () => createMessage(UPDATE_ADD_BILL_STATUS, {status: AsyncActionStatus.IN_PROGRESS});
export const amountChanged = (amount) => createMessage(AMOUNT_CHANGED, {amount});
export const descriptionChanged = (description) => createMessage(DESCRIPTION_CHANGED, {description});
export const shareValueChanged = (name, value) => createMessage(SHARE_VALUE_CHANGED, {name, value});
export const clearAddBillForm = () => createMessage(CLEAR_ADD_BILL_FORM, {});

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
