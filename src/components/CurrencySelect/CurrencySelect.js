import React from "react";
import Select from "react-select";
import "!style-loader!css-loader!react-select/dist/react-select.css";
import "!style-loader!css-loader!currency-flags/dist/currency-flags.css";

import CurrencySelectTheme from "./CurrencySelect.scss";
import classnames from "classnames";

const currencies = [
  { label: "Euro", value: "EUR" },
  { label: "US Dollar", value: "USD" },
  { label: "Pound Sterling", value: "GBP" },
  { label: "Kuna", value: "HRK" },
  { label: "Australian Dollar", value: "AUD" },
  { label: "Afghani", value: "AFN" },
  { label: "Algerian Dinar", value: "DZD" },
  { label: "East Caribbean Dollar", value: "XCD" },
  { label: "Argentine Peso", value: "ARS" },
  { label: "Aruban Florin", value: "AWG" },
  { label: "Azerbaijanian Manat", value: "AZN" },
  { label: "Bahamian Dollar", value: "BSD" },
  { label: "Bahraini Dinar", value: "BHD" },
  { label: "Taka", value: "BDT" },
  { label: "Barbados Dollar", value: "BBD" },
  { label: "Belize Dollar", value: "BZD" },
  { label: "CFA Franc BCEAO", value: "XOF" },
  { label: "Bermudian Dollar", value: "BMD" },
  { label: "Indian Rupee", value: "INR" },
  { label: "Ngultrum", value: "BTN" },
  { label: "Boliviano", value: "BOB" },
  { label: "Convertible Mark", value: "BAM" },
  { label: "Pula", value: "BWP" },
  { label: "Norwegian Krone", value: "NOK" },
  { label: "Brazilian Real", value: "BRL" },
  { label: "Brunei Dollar", value: "BND" },
  { label: "Bulgarian Lev", value: "BGN" },
  { label: "Burundi Franc", value: "BIF" },
  { label: "Cabo Verde Escudo", value: "CVE" },
  { label: "Riel", value: "KHR" },
  { label: "CFA Franc BEAC", value: "XAF" },
  { label: "Canadian Dollar", value: "CAD" },
  { label: "Cayman Islands Dollar", value: "KYD" },
  { label: "Chilean Peso", value: "CLP" },
  { label: "Yuan Renminbi", value: "CNY" },
  { label: "Colombian Peso", value: "COP" },
  { label: "Comoro Franc", value: "KMF" },
  { label: "Congolese Franc", value: "CDF" },
  { label: "New Zealand Dollar", value: "NZD" },
  { label: "Costa Rican Colon", value: "CRC" },
  { label: "Cuban Peso", value: "CUP" },
  { label: "Netherlands Antillean Guilder", value: "ANG" },
  { label: "Czech Koruna", value: "CZK" },
  { label: "Danish Krone", value: "DKK" },
  { label: "Djibouti Franc", value: "DJF" },
  { label: "Dominican Peso", value: "DOP" },
  { label: "Egyptian Pound", value: "EGP" },
  { label: "El Salvador Colon", value: "SVC" },
  { label: "Nakfa", value: "ERN" },
  { label: "Ethiopian Birr", value: "ETB" },
  { label: "Falkland Islands Pound", value: "FKP" },
  { label: "Fiji Dollar", value: "FJD" },
  { label: "CFP Franc", value: "XPF" },
  { label: "Dalasi", value: "GMD" },
  { label: "Lari", value: "GEL" },
  { label: "Ghana Cedi", value: "GHS" },
  { label: "Gibraltar Pound", value: "GIP" },
  { label: "Quetzal", value: "GTQ" },
  { label: "Guinea Franc", value: "GNF" },
  { label: "Guyana Dollar", value: "GYD" },
  { label: "Gourde", value: "HTG" },
  { label: "Lempira", value: "HNL" },
  { label: "Hong Kong Dollar", value: "HKD" },
  { label: "Forint", value: "HUF" },
  { label: "Iceland Krona", value: "ISK" },
  { label: "Rupiah", value: "IDR" },
  { label: "Iranian Rial", value: "IRR" },
  { label: "Iraqi Dinar", value: "IQD" },
  { label: "New Israeli Sheqel", value: "ILS" },
  { label: "Jamaican Dollar", value: "JMD" },
  { label: "Yen", value: "JPY" },
  { label: "Jordanian Dinar", value: "JOD" },
  { label: "Tenge", value: "KZT" },
  { label: "Kenyan Shilling", value: "KES" },
  { label: "North Korean Won", value: "KPW" },
  { label: "Won", value: "KRW" },
  { label: "Kuwaiti Dinar", value: "KWD" },
  { label: "Som", value: "KGS" },
  { label: "Kip", value: "LAK" },
  { label: "Lebanese Pound", value: "LBP" },
  { label: "Rand", value: "ZAR" },
  { label: "Liberian Dollar", value: "LRD" },
  { label: "Libyan Dinar", value: "LYD" },
  { label: "Swiss Franc", value: "CHF" },
  { label: "Pataca", value: "MOP" },
  { label: "Denar", value: "MKD" },
  { label: "Malagasy Ariary", value: "MGA" },
  { label: "Malaysian Ringgit", value: "MYR" },
  { label: "Rufiyaa", value: "MVR" },
  { label: "Ouguiya", value: "MRO" },
  { label: "Mauritius Rupee", value: "MUR" },
  { label: "Mexican Peso", value: "MXN" },
  { label: "Moldovan Leu", value: "MDL" },
  { label: "Tugrik", value: "MNT" },
  { label: "Moroccan Dirham", value: "MAD" },
  { label: "Mozambique Metical", value: "MZN" },
  { label: "Kyat", value: "MMK" },
  { label: "Namibia Dollar", value: "NAD" },
  { label: "Nepalese Rupee", value: "NPR" },
  { label: "Cordoba Oro", value: "NIO" },
  { label: "Naira", value: "NGN" },
  { label: "Rial Omani", value: "OMR" },
  { label: "Pakistan Rupee", value: "PKR" },
  { label: "Kina", value: "PGK" },
  { label: "Guarani", value: "PYG" },
  { label: "Sol", value: "PEN" },
  { label: "Philippine Peso", value: "PHP" },
  { label: "Zloty", value: "PLN" },
  { label: "Qatari Rial", value: "QAR" },
  { label: "Romanian Leu", value: "RON" },
  { label: "Russian Ruble", value: "RUB" },
  { label: "Rwanda Franc", value: "RWF" },
  { label: "Saint Helena Pound", value: "SHP" },
  { label: "Tala", value: "WST" },
  { label: "Dobra", value: "STD" },
  { label: "Saudi Riyal", value: "SAR" },
  { label: "Serbian Dinar", value: "RSD" },
  { label: "Leone", value: "SLL" },
  { label: "Singapore Dollar", value: "SGD" },
  { label: "Solomon Islands Dollar", value: "SBD" },
  { label: "Somali Shilling", value: "SOS" },
  { label: "Sri Lanka Rupee", value: "LKR" },
  { label: "Surinam Dollar", value: "SRD" },
  { label: "Lilangeni", value: "SZL" },
  { label: "Swedish Krona", value: "SEK" },
  { label: "Syrian Pound", value: "SYP" },
  { label: "New Taiwan Dollar", value: "TWD" },
  { label: "Somoni", value: "TJS" },
  { label: "Tanzanian Shilling", value: "TZS" },
  { label: "Baht", value: "THB" },
  { label: "Trinidad and Tobago Dollar", value: "TTD" },
  { label: "Tunisian Dinar", value: "TND" },
  { label: "Turkish Lira", value: "TRY" },
  { label: "Uganda Shilling", value: "UGX" },
  { label: "Hryvnia", value: "UAH" },
  { label: "UAE Dirham", value: "AED" },
  { label: "Peso Uruguayo", value: "UYU" },
  { label: "Uzbekistan Sum", value: "UZS" },
  { label: "Vatu", value: "VUV" },
  { label: "Dong", value: "VND" },
  { label: "Yemeni Rial", value: "YER" },
  { label: "Zambian Kwacha", value: "ZMW" },
  { label: "Lithuanian Litas", value: "LTL" },
  { label: "Kwacha", value: "MWK" },
  { label: "Bolivar", value: "VEF" }
];

const CurrencyFlag = ({ currency }) => (
  <div
    className={classnames(
      "currency-flag",
      `currency-flag-${currency.toLowerCase()}`,
      CurrencySelectTheme.flag
    )}
  />
);

class CurrencyOption extends React.Component {
  handleMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSelect(this.props.option, event);
  };

  handleMouseEnter = event => {
    this.props.onFocus(this.props.option, event);
  };

  handleMouseMove = event => {
    if (this.props.isFocused) {
      return;
    }
    this.props.onFocus(this.props.option, event);
  };

  render = () => {
    return (
      <div
        className={classnames(this.props.className, CurrencySelectTheme.label)}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        title={this.props.option.title}
      >
        <CurrencyFlag currency={this.props.option.value} />
        {this.props.children}
      </div>
    );
  };
}

class CurrencyValue extends React.Component {
  render = () => (
    <div className="Select-value" title={this.props.value.title}>
      <span
        className={classnames("Select-value-label", CurrencySelectTheme.label)}
      >
        <CurrencyFlag currency={this.props.value.value} />
        {this.props.children}
      </span>
    </div>
  );
}

export default ({ selectedCurrency, onCurrencyChanged }) => (
  <Select
    options={currencies}
    onChange={onCurrencyChanged}
    optionComponent={CurrencyOption}
    valueComponent={CurrencyValue}
    required
    value={selectedCurrency}
  />
);
