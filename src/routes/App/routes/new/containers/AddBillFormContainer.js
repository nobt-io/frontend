import React from "react";
import AddBillForm from "../components/AddBillForm";
import { getAmount, getDebtee, getDescription, getSplitStrategy, getShares, isValidBill, getAddBillStatus } from "../modules/addBillForm/selectors";
import { connect } from "react-redux";
import LocationBuilder from "../../../modules/navigation/LocationBuilder";
import { addBill, newMemberAdded } from "../modules/addBillForm/actions";
import { invalidateNobt } from "../../../modules/currentNobt/actions";

export default connect((state, ownProps) => {
  return {
    addBillStatus: getAddBillStatus(state),
    canSubmit: isValidBill(state),
    amount: getAmount(state),
    description: getDescription(state),
    debtee: getDebtee(state),
    splitStrategy: getSplitStrategy(state),
    shares: getShares(state),
    nobtId: ownProps.params.nobtId,
  };
}, (dispatch, props) => {
  return {
    onCancel: () => props.replace(LocationBuilder.fromWindow().pop(1).path),
    onSubmit: (id, bill) => dispatch(addBill(id, bill)),
    onNewMember: (member) => dispatch(newMemberAdded(member)),
    onShareValueChanged: (name, value) => dispatch({type: "ShareValueChanged", payload: {name, value}}),
    onSplitStrategyChanged: (splitStrategy) => dispatch({type: "SplitStrategyChanged", payload: {strategy: splitStrategy}}),
    onAmountChanged: (amount) => dispatch({type: "AmountChanged", payload: {amount}}),
    onDescriptionChanged: (description) => dispatch({type: "DescriptionChanged", payload: {description}}),
    clearAddBillForm: () => dispatch({type: "ClearAddBillForm"}),
    invalidateNobt: () => dispatch(invalidateNobt())
  }
})(AddBillForm)
