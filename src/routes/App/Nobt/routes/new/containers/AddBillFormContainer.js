import React from "react";
import AddBillForm from "../components/AddBillForm";
import { getAmount, getDebtee, getDescription, getSplitStrategy, getShares, isValidBill, getAllMembers } from "../modules/selectors";
import { connect } from "react-redux";
import { getMembers } from "../../../modules/currentNobt/selectors";
import LocationBuilder from "../../../modules/navigation/LocationBuilder";
import withNavigation from "components/hoc/withNavigation";

class AddBillFormContainer extends React.Component {

  constructor(props) {
    super(props);

    this.props.handleNewMembersProvided(props.globalMembers)
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.globalMembers.length !== this.props.globalMembers.length) {
      this.props.handleNewMembersProvided(nextProps.globalMembers)
    }

    let dataFromDebteePicker = nextProps.location.state;

    this.props.handleDebteeChanged(dataFromDebteePicker);
  }

  render = () => (
    <div>
      <AddBillForm
        onCancel={() => this.props.replace(LocationBuilder.fromWindow().pop(1).path)}
        onSubmit={this.props.onSubmit}
        canSubmit={this.props.canSubmit}
        amount={this.props.amount}
        description={this.props.description}
        debtee={this.props.debtee}
        splitStrategy={this.props.splitStrategy}
        shares={this.props.shares}
        members={this.props.localMembers}

        onAmountChange={ this.props.handleAmountChanged }
        onNewMember={this.props.handleOnNewMember }
        onDescriptionChange={ this.props.handleDescriptionChanged }
        onShareValueChange={ this.props.handleOnShareValueChanged }
        onSplitStrategyChange={ this.props.handleOnSplitStrategyChanged }
      />

      {this.props.children}
    </div>
  );

  static propTypes = {
    members: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  }
}

let componentConnectedWithLocalStore = connect(
  (state) => ({
    canSubmit: isValidBill(state),
    amount: getAmount(state),
    description: getDescription(state),
    debtee: getDebtee(state),
    splitStrategy: getSplitStrategy(state),
    shares: getShares(state),
    localMembers: getAllMembers(state)
  }),
  (dispatch) => ({
    handleNewMembersProvided: (members) => dispatch({type: "NewMembersProvided", payload: {members}}),
    handleOnShareValueChanged: (name, value) => dispatch({type: "ShareValueChanged", payload: {name, value}}),
    handleOnSplitStrategyChanged: (splitStrategy) => dispatch({type: "SplitStrategyChanged", payload: {strategy: splitStrategy}}),
    handleOnNewMember: (member) => dispatch({type: "NewMemberAdded", payload: {member: member}}),
    handleAmountChanged: (amount) => dispatch({type: "AmountChanged", payload: {amount}}),
    handleDebteeChanged: (newDebteeData) => dispatch({type: "NewDebteeSelected", payload: {...newDebteeData}}),
    handleDescriptionChanged: (description) => dispatch({type: "DescriptionChanged", payload: {description}})
  }),
  undefined,
  {
    storeKey: "localStore"
  }
)(AddBillFormContainer);

export default connect(state => {
  return {
    globalMembers: getMembers(state)
  };
}, (dispatch, props) => {
  return {
    onSubmit: () => {}
  }
})(withNavigation(componentConnectedWithLocalStore))
