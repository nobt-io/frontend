import React from 'react'
import Checkbox from 'react-toolbox/lib/checkbox';
import styles from './AmountEqualSplitPersonList.scss';

import Amount from 'components/Amount';
import PersonListItem from "../Common/PersonListItem";
import TopInfo from "../Common/TopInfo";

export const AmountEqualSplitPersonList = (props) => {

  const {persons, selectedPersons, addOrUpdateSelectedPerson, removeSelectedPerson} = props;

  const onSelectionChanged = (state, name) => {
    if (state)
      addOrUpdateSelectedPerson({name: name, value: 1});
    else
      removeSelectedPerson(name);
  };

  const personItems = persons.map(p => {

    var selectedAmount = selectedPersons.filter(sp => sp.name == p).map(sp => sp.amount )[0] || 0;
    var isSelectedPerson = selectedPersons.find(sp => sp.name == p);

    return (
    <PersonListItem className={styles.container} key={p} name={p}>
      {isSelectedPerson && <Amount spanClass={styles.amount} value={selectedAmount}/>}
      <Checkbox className={styles.checkbox} checked={isSelectedPerson} onChange={(state) => onSelectionChanged(state, p)}/>
    </PersonListItem>)
  });

  return (
    <div>
      { selectedPersons.length == 0 && <TopInfo>please select at least <b>one</b> person</TopInfo>}
      { personItems }
    </div>);
};

AmountEqualSplitPersonList.propTypes = {
  selectedPersons: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
    amount: React.PropTypes.number.isRequired,
  })),
  persons: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  removeSelectedPerson: React.PropTypes.func.isRequired,
  addOrUpdateSelectedPerson: React.PropTypes.func.isRequired
};

export default AmountEqualSplitPersonList
