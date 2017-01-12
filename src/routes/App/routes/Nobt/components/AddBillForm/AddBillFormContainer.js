import React from "react";
import AddBillForm from "./AddBillForm";
import { getAmount, getDebtee, getDescription, getSplitStrategy, getShares, isValidBill } from "./selectors";
import SplitStrategyNames from "../../../../../../const/SplitStrategyNames";
import _debug from "debug";

const log = _debug("AddBillFormContainer");

const splitStrategyDefaultValueFactory = (strategy) => {
  switch (strategy) {
    case SplitStrategyNames.EQUAL:
      return true;

    case SplitStrategyNames.PERCENTAGE:
    case SplitStrategyNames.UNEQUAL:
      return 0;
  }
};

export default class AddBillFormContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    // We must listen for this callback as the nobt is fetched asynchronously and therefore the props will be updated after the screen is initially rendered.
    // This is usually not an issue, as this screen can at the moment only be opened from the overview screen, which should already hold the current nobt.
    // But if we later plan on deep-link here, we must account for this.
    this.setState({
      members: nextProps.members,
      personValues: AddBillFormContainer.defaultPersonValuesFor(this.state.splitStrategy, nextProps.members)
    });
  }

  state = {
    debtee: null,
    description: "",
    amount: 0,
    splitStrategy: SplitStrategyNames.EQUAL,
    members: this.props.members,
    personValues: AddBillFormContainer.defaultPersonValuesFor(SplitStrategyNames.EQUAL, this.props.members),
  };

  handleOnShareValueChanged = (name, value) => {
    var personValues = this.state.personValues;

    var others = personValues.filter(pv => pv.name !== name);
    var newEntry = {name, value};

    this.setState({
      personValues: [ ...others, newEntry ]
    })
  };

  handleOnSplitStrategyChanged = (splitStrategy) => {
    this.setState({
      personValues: AddBillFormContainer.defaultPersonValuesFor(splitStrategy, this.state.members),
      splitStrategy: splitStrategy
    });
  };

  handleOnNewMember = (member) => {
    this.setState({
      members: [ ...this.state.members, member ],
      personValues: [ ...this.state.personValues, {name: member, value: splitStrategyDefaultValueFactory(this.state.splitStrategy)} ]
    });
  };

  render = () => (
    <AddBillForm
      onCancel={this.props.onCancel}
      onSubmit={this.props.onSubmit}
      canSubmit={isValidBill(this.state)}
      members={this.state.members}
      amount={getAmount(this.state)}
      description={getDescription(this.state)}
      debtee={getDebtee(this.state)}
      splitStrategy={getSplitStrategy(this.state)}
      shares={getShares(this.state)}
      onAmountChange={ amount => this.setState({amount: amount}) }
      onDebteeChange={ debtee => this.setState({debtee: debtee})}
      onNewMember={this.handleOnNewMember }
      onDescriptionChange={ description => this.setState({description: description}) }
      onShareValueChange={ this.handleOnShareValueChanged }
      onSplitStrategyChange={ this.handleOnSplitStrategyChanged }
    />
  );

  static defaultPersonValuesFor(splitStrategy, members) {

    log("defaultPersonValuesFor", splitStrategy, members);

    return members.map(name => { return {name: name, value: splitStrategyDefaultValueFactory(splitStrategy)} })
  }

  static propTypes = {
    members: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  }
}
