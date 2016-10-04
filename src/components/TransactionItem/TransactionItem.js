import React from 'react'
import styles from './TransactionItem.scss'

import Avatar from 'components/Avatar'
import Card from 'components/Card'
import FontIcon from 'react-toolbox/lib/font_icon';

const getKeyWord = (amount) => amount > 0 ? "gets" : "owes";
const getPersonKeyWord = (amount) => amount > 0 ? "from" : "to";
const getIcon = (amount) => amount > 0 ? "add_circle_outline" : "remove_circle_outline";
const getAbs = (amount) => Math.abs(amount);

export const TransactionItem = (props) => {

  const me = props.transaction.me;
  const total = props.transaction.total;
  const debtorsAvatars = props.transaction.summaries.map(s => (<span className={styles.personAvatar}><Avatar name={s.name} size={20} fontSize={11}/></span>));

  return (
    <Card>
      <div className={styles.container}>
        <div className={styles.avatar}><Avatar name={me} size={45}/></div>
        <div className={styles.amount}>
          <span className={styles.icon}><FontIcon value={getIcon(total)} /></span>
          <span className={styles.total}>{getAbs(total)} €</span>
          <span className={styles.keyword}>{getKeyWord(total)}</span>
        </div>
        <div className={styles.transactionDetails}>
          <div className={styles.me}>{me}</div>
          <div className={styles.persons}>{debtorsAvatars}</div>
        </div>
      </div>
    </Card>);
};


export default TransactionItem
