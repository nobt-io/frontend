import React from 'react'
import CurrencyInput from 'components/CurrencyInput';
import styles from './AmountUnequalSplitPersonList.scss'

import CommonPropTypes from '../Common/CommonPropTypes'
import Amount from 'components/Amount';
import PersonListItem from "../Common/PersonListItem"
import TopInfo from "../Common/TopInfo"
import { FormattedMessage } from "react-intl";

export const AmountUnequalSplitPersonList = (props) => {

  const {nobtMembers, involvedPersons, setPersonValue, involvedPersonsAreValid, involvedPersonsCalculationInfo} = props;

  console.log(props);
  const onInputChange = (name, value) => setPersonValue(name, value);

  const personItems = nobtMembers.map(p => {
    const value = (involvedPersons.filter(s => s.name === p)[ 0 ] || {amount: 0}).amount;

    return (
      <PersonListItem key={p} name={p}>
        <CurrencyInput className={styles.input} onChange={v => onInputChange(p, v)} value={value} />
      </PersonListItem>);
  });

  const message = (<FormattedMessage
    id="AmountUnequalSplitPersonList.topInfo"
    defaultMessage={`Remaining amount to split: {remainingAmounts}`}
    values={{remainingAmounts: <Amount value={involvedPersonsCalculationInfo.remainingAmount} absolute={false} />}}
  />);

  return (
    <div>
      { !involvedPersonsAreValid && <TopInfo>{message}</TopInfo>}
      { personItems }
    </div>);
};

AmountUnequalSplitPersonList.propTypes = {
  ...CommonPropTypes,
  involvedPersonsCalculationInfo: React.PropTypes.shape({
    currentAmount: React.PropTypes.number.isRequired,
    remainingAmount: React.PropTypes.number.isRequired,
  })
};

export default AmountUnequalSplitPersonList;
