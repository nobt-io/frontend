import React from 'react'
import styles from './AmountInput.scss'
import InputTheme from '../InputTheme.scss'
import CurrencyInput from 'components/CurrencyInput'


export const AmountInput = (props) => (

  <div className={styles.AmountInput}>
    <div className={styles.CurrencyInput}>
      <span>EUR</span>
    </div>
    <div className={styles.MoneyInput}>
      <CurrencyInput theme={InputTheme} value={props.value || 0} onChange={props.onChange}/>
    </div>
  </div>
);

CurrencyInput.propTypes = {
  onChange: React.PropTypes.func.isRequired
};

export default AmountInput
