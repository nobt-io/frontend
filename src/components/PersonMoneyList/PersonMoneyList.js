import React from 'react'
import styles from './PersonMoneyList.scss'

const getAmountKeyWord = (amount) => amount > 0 ? "gets" : "owes";
const getAbs = (amount) => Math.abs(amount);

import Avatar from 'components/Avatar'

const getPersonMoneyListItem = (person, showKeyword) => (
  <div className={styles.row}>
    <div className={styles.avatarCell}><Avatar name={person.name} size={30}/></div>
    <div className={styles.nameCell}>{person.name}</div>
    <div className={styles.amountCell}>
      <span style={{display: (showKeyword) ? "inline" : "none"}}>{getAmountKeyWord(person.amount * -1)}</span>
      <b className={styles.amount}>{getAbs(person.amount)} €</b>
    </div>
    <div style={{clear: "both"}}></div>
  </div>
);

export const PersonMoneyList = (props) => {

  const showKeyword = props.showKeyword;

  const personItems = props.persons.map(p => getPersonMoneyListItem(p, showKeyword ));

  return(<div className={styles.container}>{personItems}</div>)
}

export default PersonMoneyList
