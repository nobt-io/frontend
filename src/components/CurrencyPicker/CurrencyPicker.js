import PropTypes from 'prop-types';
import React from 'react';
import currencies from './assets/currencies';
import Dropdown from 'react-toolbox-legacy/lib/dropdown';

const CurrencyPicker = ({
  onCurrencyChanged,
  selectedCurrency,
  dropDownTheme,
}) => (
  <Dropdown
    auto
    theme={dropDownTheme}
    onChange={onCurrencyChanged}
    source={currencies}
    value={selectedCurrency}
  />
);

CurrencyPicker.propTypes = {
  onCurrencyChanged: PropTypes.func,
  selectedCurrency: PropTypes.string.isRequired,
  dropDownTheme: PropTypes.object,
};

CurrencyPicker.defaultProps = {
  onCurrencyChanged: value => {},
  dropDownTheme: {},
};

export default CurrencyPicker;
