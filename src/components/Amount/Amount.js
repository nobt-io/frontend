import React from "react";
import format from "format-number";

const currencyFormatLookup = {
  'EUR': {prefix: '€', suffix: ''},
  'GBR': {prefix: '£', suffix: ''}
};

const formatAmount = (amount, currency) => format(currencyFormatLookup[currency])(amount, {noSeparator: true});

export const Amount = (props, context) => (
  <span className={props.theme.span}>{formatAmount( (props.absolute) ? Math.abs(props.value): props.value, context.currency)}</span>
);

Amount.defaultProps = {
  theme: {
    span: ''
  },
  absolute: true
};

Amount.propTypes = {
  value: React.PropTypes.number.isRequired,
  theme: React.PropTypes.shape({
    span: React.PropTypes.string.isRequired
  }),
  absolute: React.PropTypes.bool
};

Amount.contextTypes = {
  currency: React.PropTypes.string.isRequired
};

export default Amount
