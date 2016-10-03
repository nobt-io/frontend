import React from 'react'
import styles from './TransactionItem.scss'

import Avatar from 'components/Avatar'
import Card from 'components/Card'
import PersonMoneyList from 'components/PersonMoneyList'

const getAmountKeyWord = (amount) => amount > 0 ? "gets" : "owes";
const getAbs = (amount) => Math.abs(amount);

export const TransactionItem = (props) => {

  const me = props.transaction.me;
  const total = props.transaction.total;
  const persons = <PersonMoneyList persons={props.transaction.summaries}/>;



  return (
    <Card>
      <div className={styles.transactionItem}>
        <div className={styles.avatar}>
          <Avatar name={me} size={15}/>
        </div>
        <div className={styles.content}>
          <div>
            <span className={styles.amountContent}>
              <span>{getAmountKeyWord(total)}</span>
              <span className={styles.amount}>{getAbs(total)} €</span>
            </span>
            <span className={styles.name}>{me}</span>
          </div>
          <div className={styles.persons}>
            {persons}
          </div>
        </div>
      </div>
    </Card>);
};


export default TransactionItem
