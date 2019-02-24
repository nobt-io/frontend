import PropTypes from 'prop-types';
import React from 'react';
import Input from './Input';
import CurrencyInputValidator from './CurrencyInputValidator';
import getCurrencySymbol from 'currency-symbol-map';

export class CurrencyInput extends React.Component {
  state = {
    inputValue: '',
    value: 0,
  };

  valueChanged = displayValue => {
    const previousValue = this.state.inputValue;
    if (CurrencyInputValidator.amountsAreEqual(previousValue, displayValue)) {
      return;
    }

    if (CurrencyInputValidator.validateInput(displayValue)) {
      const number = this.parseNumber(displayValue);
      this.setState({ value: number, inputValue: displayValue });
      this.props.onChange(number);
    } else {
      this.setState({ ...this.state, inputValue: previousValue });
    }
  };

  parseNumber = displayValaue => {
    let number = displayValaue.replace(',', '.');
    let numberIsEmptyOrOnlySeperator = number === '.' || number === '';
    return Number(numberIsEmptyOrOnlySeperator ? 0 : number);
  };

  render = () => {
    // TODO: Duplicating information from props in state is an anti-pattern in react.
    var displayValue =
      this.state.value !== this.props.value //if state does not hold current value, update it
        ? this.props.value
        : this.state.inputValue;

    displayValue = displayValue || ''; //avoid NaN

    return (
      <Input
        placeholder="0.00"
        icon={
          <span>
            {this.props.currency && getCurrencySymbol(this.props.currency)}
          </span>
        }
        error={this.props.error}
        value={displayValue}
        lang="en-150" // Solves the "numbers with a comma are not valid decimal numbers"-problem: For more see: https://www.ctrl.blog/entry/html5-input-number-localization
        onChange={this.valueChanged}
        data-cy={this.props['data-cy']}
      />
    );
  };
}

CurrencyInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  currency: PropTypes.string,
};

export default CurrencyInput;
