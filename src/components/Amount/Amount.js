import PropTypes from 'prop-types';
import React from 'react';
import { FormattedNumber } from 'react-intl';
import { connect } from 'react-redux';
import classnames from 'classnames';

const valueViewModel = props =>
  props.absolute ? Math.abs(props.value) : props.value;

const computeClassNames = props =>
  classnames({
    [`${props.theme.root}`]: props.theme.root != null,
    [`${props.theme.positive}`]:
      props.theme.positive != null && props.value > 0,
    [`${props.theme.negative}`]:
      props.theme.negative != null && props.value < 0,
  });

const Amount = props => (
  <span className={computeClassNames(props)}>
    <FormattedNumber
      value={valueViewModel(props)}
      currency={props.currencyOverride || props.currency}
      style="currency"
    />
  </span>
);

Amount.defaultProps = {
  absolute: true,
  theme: {
    root: null,
    positive: null,
    negative: null,
  },
};

Amount.propTypes = {
  value: PropTypes.number.isRequired,
  absolute: PropTypes.bool,
  theme: PropTypes.shape({
    root: PropTypes.string,
    positive: PropTypes.string,
    negative: PropTypes.string,
  }),
  currencyOverride: PropTypes.string,
};

export default connect(
  state => ({
    currency: state.App.currentNobt.data.currency,
  }),
  () => ({})
)(Amount);
