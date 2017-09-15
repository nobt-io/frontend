import React from "react";
import { FormattedNumber } from "react-intl";
import { connect } from "react-redux";
import { getCurrency } from "../../routes/App/modules/currentNobt/selectors";
import classnames from "classNames";

const valueViewModel = (props) => (props.absolute) ? Math.abs(props.value): props.value;

const computeClassNames = (props) => classnames({
  [`${props.theme.root}`]: props.theme.root != null,
  [`${props.theme.positive}`]: props.theme.positive != null && props.value > 0,
  [`${props.theme.negative}`]: props.theme.negative != null && props.value < 0,
});

const Amount = (props) => (
  <span className={computeClassNames(props)}>
    <FormattedNumber value={valueViewModel(props)} currency={props.currency} style="currency"/>
  </span>
);

Amount.defaultProps = {
  absolute: true,
  theme: {
    root: null,
    positive: null,
    negative: null
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
