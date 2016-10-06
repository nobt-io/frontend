import React from "react";
import format from "format-number";

const currencyFormatLookup = {
  'EUR': {prefix: '€', suffix: ''},
  'GBR': {prefix: '£', suffix: ''}
};

const formatAmount = (amount, currency) => format(currencyFormatLookup[currency])(amount, {noSeparator: true});

export const Amount = (props, context) => (
  <span className={props.spanClass}>{formatAmount( (props.absolute) ? Math.abs(props.value): props.value, context.currency)}</span>
);

Amount.defaultProps = {
  spanClass: '',
  absolute: true
};

Amount.propTypes = {
  value: React.PropTypes.number.isRequired,
  spanClass: React.PropTypes.string,
  absolute: React.PropTypes.bool
};

Amount.contextTypes = {
  currency: React.PropTypes.string.isRequired
};

export default Amount
