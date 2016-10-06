import React from "react";
import {FormattedNumber} from "react-intl";

const value = (props) => (props.absolute) ? Math.abs(props.value): props.value;

export const Amount = (props, context) => (
  <span className={props.spanClass}>
    <FormattedNumber value={value(props)} currency={context.currency} style="currency"/>
  </span>
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
