import React from 'react'
import styles from './TransactionItem.scss'

import Avatar from 'components/Avatar'
import Card from 'components/Card'
import FontIcon from 'react-toolbox/lib/font_icon';

const getKeyWord = (amount) => amount > 0 ? "gets" : "owes";
const getPersonKeyWord = (amount) => amount > 0 ? "from" : "to";
const getIcon = (amount) => amount > 0 ? "add_circle" : "remove_circle";
const getAbs = (amount) => Math.abs(amount);

export const TransactionItem = (props) => {

  const me = props.transaction.me;
  const total = props.transaction.total;
  const debtorsAvatars = props.transaction.summaries.map(s => (
    <span className={styles.personAvatar}><Avatar name={s.name} size={20} fontSize={11}/></span>));

  return (
    <Card>
      <div className={styles.container}>
        <div className={styles.avatar}>
          <Avatar name={me} size={45}/>
          <span className={styles.icon}><FontIcon value={getIcon(total)}/></span>
        </div>
        <div className={styles.meContainer}>
          <span className={styles.me}>{me}</span>
          <span className={styles.transparent}></span>
        </div>
        <div className={styles.amountInfo}>
          <div className={styles.amount}>
            <span className={styles.total}>{getAbs(total)} €</span>
            <span className={styles.keyword}>{getKeyWord(total)}</span>
            <div style={{clear: "both"}}></div>
          </div>
          <div className={styles.persons}>{getPersonKeyWord(total)}{debtorsAvatars}</div>
        </div>
      </div>
    </Card>);
};


export default TransactionItem
