import React from "react";
import {FormattedNumber} from "react-intl";
import { connect } from "react-redux";
import { getCurrency } from "../../routes/App/Nobt/modules/currentNobt/selectors";

const value = (props) => (props.absolute) ? Math.abs(props.value): props.value;

const Amount = (props) => (
  <span className={props.spanClass}>
    <FormattedNumber value={value(props)} currency={props.currency} style="currency"/>
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

export default connect(
  (state) => ({
    currency: getCurrency(state)
  }),
  () => ({})
)(Amount)
