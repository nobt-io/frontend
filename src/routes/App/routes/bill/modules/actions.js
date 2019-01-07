import Client from "../../../../../api/api";
import AsyncActionStatus from "../../../../../const/AsyncActionStatus";

export const UPDATE_ADD_BILL_STATUS = 'UPDATE_ADD_BILL_STATUS';
export const NEW_DEBTEE_SELECTED = 'NEW_DEBTEE_SELECTED';
export const SAVE_CONVERSION_INFORMATION = 'SAVE_CONVERSION_INFORMATION';
export const CLEAR_CONVERSION_INFORMATION = 'CLEAR_CONVERSION_INFORMATION';
export const NEW_MEMBER_ADDED = 'NEW_MEMBER_ADDED';
export const FOCUS_ID_CHANGED = 'FOCUS_ID_CHANGED';
export const AMOUNT_CHANGED = 'AMOUNT_CHANGED';
export const DESCRIPTION_CHANGED = 'DESCRIPTION_CHANGED';
export const SHARE_VALUE_CHANGED = 'SHARE_VALUE_CHANGED';
export const CLEAR_ADD_BILL_FORM = 'CLEAR_ADD_BILL_FORM';

const createAction = (type, payload) => ({type, payload: {...payload}});

export const focusIdChanged = (focusId) => createAction(FOCUS_ID_CHANGED, {focusId});
export const newMemberAdded = (member) => createAction(NEW_MEMBER_ADDED, {member});
export const newDebteeSelected = (debtee) => createAction(NEW_DEBTEE_SELECTED, {debtee});

export const saveConversionInformation = (payload) => createAction(SAVE_CONVERSION_INFORMATION, payload);
export const clearConversionInformation = () => createAction(CLEAR_CONVERSION_INFORMATION);

export const addBillFailed = (error) => createAction(UPDATE_ADD_BILL_STATUS, {error, status: AsyncActionStatus.FAILED});
export const addBillSucceeded = (response) => createAction(UPDATE_ADD_BILL_STATUS, {response, status: AsyncActionStatus.SUCCESSFUL});
export const addBillStarted = () => createAction(UPDATE_ADD_BILL_STATUS, {status: AsyncActionStatus.IN_PROGRESS});
export const amountChanged = (amount) => createAction(AMOUNT_CHANGED, {amount});
export const descriptionChanged = (description) => createAction(DESCRIPTION_CHANGED, {description});
export const shareValueChanged = (name, value) => createAction(SHARE_VALUE_CHANGED, {name, value});
export const clearAddBillForm = () => createAction(CLEAR_ADD_BILL_FORM, {});

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
