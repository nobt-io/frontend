import React from 'react'
import styles from './PersonMoneyList.scss'

const getAmountKeyWord = (amount) => amount > 0 ? "gets" : "owes";
const getAbs = (amount) => Math.abs(amount);

import Avatar from 'components/Avatar'

const getPersonMoneyListItem = (person) => (
  <div className={styles.row}>
    <div className={styles.avatarCell}><Avatar name={person.name} size={10}/></div>
    <div className={styles.nameCell}>{person.name}</div>
    <div className={styles.amountCell}>
      <span>{getAmountKeyWord(person.amount * -1)}</span>
      <b className={styles.amount}>{getAbs(person.amount)} €</b>
    </div>
  </div>
);

export const PersonMoneyList = (props) => {
  const personItems = props.persons.map(p => getPersonMoneyListItem(p));

  return(<div className={styles.container}>{personItems}</div>)

}

export default PersonMoneyList
