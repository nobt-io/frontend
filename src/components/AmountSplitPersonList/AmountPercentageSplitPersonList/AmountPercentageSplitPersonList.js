import React from "react";
import PercentageInput from "components/PercentageInput";
import styles from "./AmountPercentageSplitPersonList.scss";

import Amount from "components/Amount";
import PersonListItem from "../Common/PersonListItem";
import TopInfo from "../Common/TopInfo";
import CommonPropTypes from '../Common/CommonPropTypes'
import { FormattedMessage } from "react-intl";

export const AmountPercentageSplitPersonList = (props) => {

  const {nobtMembers, involvedPersons, setPersonValue, involvedPersonsAreValid, involvedPersonsCalculationInfo} = props;

  const personItems = nobtMembers.map(p => {
    const value = (involvedPersons.filter(s => s.name === p)[ 0 ] || {value: 0}).value;
    const amount = (involvedPersons.find(sp => sp.name === p) || {amount: 0}).amount;

    return (
      <PersonListItem className={styles.container} key={p} name={p}>

        {value !== 0 && <Amount spanClass={styles.amount} value={amount}/>}
        <PercentageInput className={styles.input} onChange={v =>  setPersonValue(p, v)} value={value} />
      </PersonListItem>);
  });

  const message = (<FormattedMessage
    id="AmountPercentageSplitPersonList.topInfo"
    defaultMessage={`You missed {remainingAmounts}% to add up to 100%.`}
    values={{remainingAmounts: involvedPersonsCalculationInfo.remainingPercentage}}
  />);

  return (
    <div>
      { !involvedPersonsAreValid && <TopInfo>{message}</TopInfo>}
      { personItems }
    </div>);
};

AmountPercentageSplitPersonList.propTypes = {
  ...CommonPropTypes,
  involvedPersonsCalculationInfo: React.PropTypes.shape({
    remainingPercentage: React.PropTypes.number.isRequired,
  })
};

export default AmountPercentageSplitPersonList;
