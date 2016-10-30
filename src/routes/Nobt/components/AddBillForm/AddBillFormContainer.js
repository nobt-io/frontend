import React from "react";
import AddBillForm from "./AddBillForm";
import { getAmount, getDebtee, getDescription, getSplitStrategy, getShares } from "./selectors";
import SplitStrategyNames from "const/SplitStrategyNames";

export default class AddBillFormContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      debtee: "?",
      description: "",
      amount: 0,
      splitStrategy: null,
      personValues: []
    };

    this.handleOnShareValueChanged = this.handleOnShareValueChanged.bind(this);
    this.handleOnSplitStrategyChanged = this.handleOnSplitStrategyChanged.bind(this);
  }

  componentWillMount() {
    this.handleOnSplitStrategyChanged(SplitStrategyNames.EQUAL);
  }

  handleOnShareValueChanged(name, value) {
    var personValues = this.state.personValues;

    var others = personValues.filter(pv => pv.name !== name);
    var newEntry = {name, value};

    this.setState({
      personValues: [ ...others, newEntry ]
    })
  }

  handleOnSplitStrategyChanged(splitStrategy) {
    this.setState({
      personValues: AddBillFormContainer.defaultPersonValuesFor(splitStrategy, this.props.members),
      splitStrategy: splitStrategy
    });
  }

  render() {
    return (
      <AddBillForm
        onCancel={this.props.onCancel}
        onSubmit={this.props.onSubmit}
        members={this.props.members}
        amount={getAmount(this.state)}
        description={getDescription(this.state)}
        debtee={getDebtee(this.state)}
        splitStrategy={getSplitStrategy(this.state)}
        shares={getShares(this.state)}
        onAmountChange={ (amount) => { this.setState({amount: amount}) } }
        onDebteeChange={ (debtee) => { this.setState({debtee: debtee}) } }
        onShareValueChange={ this.handleOnShareValueChanged }
        onSplitStrategyChange={ this.handleOnSplitStrategyChanged }
        onDescriptionChange={ (description) => { this.setState({description: description}) } }
      />
    );
  }

  static defaultPersonValuesFor(splitStrategy, members) {
    switch (splitStrategy) {
      case SplitStrategyNames.EQUAL:
        return members.map(name => { return {name: name, value: true} });

      case SplitStrategyNames.PERCENTAGE:
      case SplitStrategyNames.UNEQUAL:
        return members.map(name => { return {name: name, value: 0} });
    }
  }

  static propTypes = {
    members: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  }
}
