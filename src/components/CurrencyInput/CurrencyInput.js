import React from 'react'
import Input from "react-toolbox/lib/input";

import CurrencyInputValidator from './CurrencyInputValidator';

export const CurrencyInput = React.createClass({

  getInitialState() {
    return { inputValue: "" }
  },

  valueChanged: function(newValue, valueChangedCb){

    const previousValue = this.state.inputValue;
    if (CurrencyInputValidator.amountsAreEqual(previousValue, newValue)) {
      return;
    }

    if (CurrencyInputValidator.validateInput(newValue)) {
      this.setState({inputValue: newValue});
      const intValue = Number(newValue.replace(',', '.'));
      this.props.onChange(intValue);
    } else {
      this.setState({inputValue: previousValue});
    }
  },

  render: function () {
    return (
      <Input {...this.props} placeholder="0.00" value={this.state.inputValue} onChange={this.valueChanged}/>)
  }
});

CurrencyInput.propTypes = {
  onChange: React.PropTypes.func.isRequired
};

export default CurrencyInput



