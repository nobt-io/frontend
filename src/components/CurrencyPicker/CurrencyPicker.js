import React from "react";
import currencies from "./assets/currencies";
import Dropdown from "react-toolbox/lib/dropdown";

const CurrencyPicker = ({onCurrencyChanged, selectedCurrency, dropDownTheme}) => (
  <Dropdown
    auto
    theme={dropDownTheme}
    onChange={onCurrencyChanged}
    source={currencies}
    value={selectedCurrency}
  />
);

CurrencyPicker.propTypes = {
  onCurrencyChanged: React.PropTypes.func,
  selectedCurrency: React.PropTypes.string.isRequired,
  dropDownTheme: React.PropTypes.object,
};

CurrencyPicker.defaultProps = {
  onCurrencyChanged: (value) => { },
  dropDownTheme: {},
};

export default CurrencyPicker;
