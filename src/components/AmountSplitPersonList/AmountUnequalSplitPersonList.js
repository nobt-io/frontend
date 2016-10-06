import React from 'react'
import CurrencyInput from 'components/CurrencyInput';
import styles from './AmountUnequalSplitPersonList.scss'

import PropTypes from "./PropTypeDefinition";
import PersonListItem from "./PersonListItem"
import TopInfo from "./TopInfo"

export const AmountEqualSplitPersonList = (props) => {

  const {persons, selectedPersons, addOrUpdateSelectedPerson, removeSelectedPerson} = props;

  const onInputChange = (person, value) => {
    addOrUpdateSelectedPerson({name: person, value: value});
  };

  const personItems = persons.map(p => {

    const value = (selectedPersons.filter(s => s.name === p)[0] || {amount: 0}).amount;

    return (
      <PersonListItem key={p} name={p}>
        <CurrencyInput className={styles.input} onChange={v => onInputChange(p, v)} value={value}/>
      </PersonListItem>)
  });

  return (
    <div>
      { selectedPersons.length == 0 && <TopInfo>please select at least <b>one</b> person</TopInfo>}
      { personItems }
    </div>);
};

AmountEqualSplitPersonList.propTypes = PropTypes;

export default AmountEqualSplitPersonList


