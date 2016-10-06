import React from 'react'
import Input from "react-toolbox/lib/input";

import PercentageInputValidator from "./PercentageInputValidator";

export const PercentageInput = React.createClass({

  getInitialState () {
    return {inputValue: "", value: 0};
  },

  valueChanged: function (newValue) {
    const previousValue = this.state.inputValue;
    if (PercentageInputValidator.percentageIsEqual(previousValue, newValue)) {
      return;
    }

    if (PercentageInputValidator.validateInput(newValue)) {
      const intValue = Number(newValue);
      this.setState({value: intValue, inputValue: newValue});
      console.log(intValue);
      this.props.onChange(intValue);
    } else {
      console.log("error", newValue);
      this.setState({...this.state, inputValue: previousValue});
    }
  },

  render: function () {
    var displayValue =
      (this.state.value !== this.props.value) //if state does not hold current value, update it
        ? this.props.value : this.state.inputValue;

    displayValue = displayValue || ""; //avoid NaN

    return (<Input {...this.props} placeholder="0" value={displayValue} onChange={this.valueChanged}/>)
  }
});

PercentageInput.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.number.isRequired
};

export default PercentageInput;
