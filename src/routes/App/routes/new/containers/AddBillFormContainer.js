import React from "react";
import AddBillForm from "../components/AddBillForm";
import { getAmount, getDebtee, getDescription, getSplitStrategy, getShares, isValidBill } from "../modules/addBillForm/selectors";
import { connect } from "react-redux";
import LocationBuilder from "../../../modules/navigation/LocationBuilder";
import { addBill } from "../modules/addBillForm/actions";

export default connect((state, ownProps) => {
  return {
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
    onSubmit: (id, bill) => {
      dispatch(addBill(id, bill));
      props.replace(LocationBuilder.fromWindow().pop(1).path);
    },
    onNewMember: (member) => dispatch({type: "NewMemberAdded", payload: {member: member}}),
    onShareValueChanged: (name, value) => dispatch({type: "ShareValueChanged", payload: {name, value}}),
    onSplitStrategyChanged: (splitStrategy) => dispatch({type: "SplitStrategyChanged", payload: {strategy: splitStrategy}}),
    onAmountChanged: (amount) => dispatch({type: "AmountChanged", payload: {amount}}),
    onDescriptionChanged: (description) => dispatch({type: "DescriptionChanged", payload: {description}}),
    clearAddBillForm: () => dispatch({type: "ClearAddBillForm"})
  }
})(AddBillForm)
