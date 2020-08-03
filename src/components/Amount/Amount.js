import PropTypes from 'prop-types';
import React from 'react';
import { FormattedNumber } from 'react-intl';
import classnames from 'classnames';
import { useNobt } from '../../hooks/useNobt';

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

export default function Amount(props) {
  const nobt = useNobt();

  return (
    <span className={computeClassNames(props)}>
      <FormattedNumber
        value={valueViewModel(props)}
        currency={props.currencyOverride || nobt.currency}
        style="currency"
      />
    </span>
  );
}

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
