import React from 'react'
import Input from "react-toolbox/lib/input";

import CurrencyInputValidator from './CurrencyInputValidator';

export const CurrencyInput = React.createClass({

  getInitialState() {
    return {inputValue: "", value: 0}
  },

  valueChanged: function (newValue) {

    const previousValue = this.state.inputValue;
    if (CurrencyInputValidator.amountsAreEqual(previousValue, newValue)) {
      return;
    }

    if (CurrencyInputValidator.validateInput(newValue)) {
      const intValue = Number(newValue.replace(',', '.'));
      this.setState({value: intValue, inputValue: newValue});
      this.props.onChange(intValue);
    } else {
      this.setState({...this.state, inputValue: previousValue});
    }
  },

  render: function () {

    // TODO: Duplicating information from props in state is an anti-pattern in react.
    var displayValue =
      (this.state.value !== this.props.value) //if state does not hold current value, update it
        ? this.props.value : this.state.inputValue;

    displayValue = displayValue || ""; //avoid NaN

    return (<Input {...this.props} placeholder="0.00" value={displayValue} onChange={this.valueChanged}/>)
  }
});

CurrencyInput.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.number.isRequired
};

export default CurrencyInput;
