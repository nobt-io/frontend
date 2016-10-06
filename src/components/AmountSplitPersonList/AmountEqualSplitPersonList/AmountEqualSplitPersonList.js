import React from 'react'
import Checkbox from 'react-toolbox/lib/checkbox';
import styles from './AmountEqualSplitPersonList.scss';

import Amount from 'components/Amount';
import PersonListItem from "../Common/PersonListItem";
import TopInfo from "../Common/TopInfo";
import CommonPropTypes from '../Common/CommonPropTypes'

export const AmountEqualSplitPersonList = (props) => {

  const {nobtMembers, involvedPersons, setPersonValue, involvedPersonsAreValid} = props;

  const onSelectionChanged = (state, name) => setPersonValue(name, state ? 1 : 0);

  const personItems = nobtMembers.map(p => {

    var selectedAmount = involvedPersons.filter(sp => sp.name === p).map(sp => sp.amount )[0] || 0;
    var isSelectedPerson = (involvedPersons.find(sp => sp.name === p) || {value: 0}).value == 1;

    return (
    <PersonListItem className={styles.container} key={p} name={p}>
      {isSelectedPerson && <Amount spanClass={styles.amount} value={selectedAmount}/>}
      <Checkbox className={styles.checkbox} checked={isSelectedPerson} onChange={(state) => onSelectionChanged(state, p)}/>
    </PersonListItem>)
  });

  return (
    <div>
      { !involvedPersonsAreValid && <TopInfo>Please select at least <b>one</b> person.</TopInfo>}
      { personItems }
    </div>);
};

AmountEqualSplitPersonList.propTypes = {
  ...CommonPropTypes
};

export default AmountEqualSplitPersonList
