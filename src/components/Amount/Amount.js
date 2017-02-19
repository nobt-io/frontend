import React from "react";
import { FormattedNumber } from "react-intl";
import { connect } from "react-redux";
import { getCurrency } from "../../routes/App/modules/currentNobt/selectors";

const valueViewModel = (props) => (props.absolute) ? Math.abs(props.value): props.value;
const computeValueClass = (props) => (props.value > 0) ? props.theme.positive : props.theme.negative

const Amount = (props) => (
  <span className={props.theme.root + " " + computeValueClass(props)}>
    <FormattedNumber value={valueViewModel(props)} currency={props.currency} style="currency"/>
  </span>
);

Amount.defaultProps = {
  absolute: true,
  theme: {
    root: "",
    positive: "",
    negative: ""
  }
};

Amount.propTypes = {
  value: React.PropTypes.number.isRequired,
  absolute: React.PropTypes.bool,
  theme: React.PropTypes.shape({
    root: React.PropTypes.string,
    positive: React.PropTypes.string,
    negative: React.PropTypes.string
  })
};

export default connect(
  (state) => ({
    currency: getCurrency(state)
  }),
  () => ({})
)(Amount)
