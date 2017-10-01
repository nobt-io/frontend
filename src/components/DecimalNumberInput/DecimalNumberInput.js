import React from 'react'
import Input from "react-toolbox/lib/input";
import CurrencyInputValidator from './CurrencyInputValidator';

export const DecimalNumberInput = React.createClass({

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

    return (<Input
      {...this.props}
      placeholder="0.00"
      type="number"
      value={displayValue}
      step="0.01"
      lang="en-150" // Solves the "numbers with a comma are not valid decimal numbers"-problem: For more see: https://www.ctrl.blog/entry/html5-input-number-localization
      onChange={this.valueChanged}
    />)
  }
});

DecimalNumberInput.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.number
};

export default DecimalNumberInput;
