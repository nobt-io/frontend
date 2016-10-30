import React from "react";
import _debug from "debug";
import AddBillForm from "./AddBillForm";
import { getAmount, getDebtee, getDescription, getSplitStrategy, getShares } from "./selectors";
import SplitStrategyNames from "const/SplitStrategyNames";

export class AddBillFormContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      debtee: "?",
      description: "",
      amount: 30,
      splitStrategy: SplitStrategyNames.EQUAL,
      personValues: []
    };

    this.handleOnShareValueChanged = this.handleOnShareValueChanged.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      personValues: AddBillFormContainer.getInitialPersonValues(props.members)
    })
  }

  handleOnShareValueChanged(name, value) {
    var personValues = this.state.personValues;

    var others = personValues.filter(pv => pv.name !== name);
    var newEntry = {name, value};

    this.setState({
      personValues: [...others, newEntry]
    })
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
        onSplitStrategyChange={ (splitStrategy) => { this.setState({splitStrategy: splitStrategy}) } }
        onDescriptionChange={ (description) => { this.setState({description: description}) } }
      />
    );
  }

  static getInitialPersonValues(members) {

    _debug("getInitialPersonValues")(members);

    return members.map(name => {
      return {
        name: name,
        value: true
      }
    });
  }

  static propTypes = {
    members: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  }
}
