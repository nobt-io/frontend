import React from 'react'
import styles from './TransactionItem.scss'

import Avatar from 'components/Avatar'
import {Card, CardTitle, CardText} from 'react-toolbox/lib/card';


const getAmountKeyWord = (amount) => amount > 0 ? "gets" : "owes";
const getAbs = (amount) => Math.abs(amount);

const getTransactionRows = (summary) => (
      <div className={styles.row}>
        <div className={styles.avatarCell}><Avatar name={summary.name} size={10}/></div>
        <div className={styles.nameCell}>{summary.name}</div>
        <div className={styles.amountCell}>
          <span>{getAmountKeyWord(summary.amount * -1)}</span>
          <b className={styles.amount}>{getAbs(summary.amount)} €</b>
        </div>
      </div>
  );


export const TransactionItem = (props) => {

  const me = props.transaction.me;
  const total = props.transaction.total;
  const transactionRows = props.transaction.summaries.map((summary) => (getTransactionRows(summary)));

  return (
  <Card className={styles.card}>
    <div className={styles.transactionItem}>
      <div className={styles.avatar}>
        <Avatar name={me} size={15}/>
      </div>
      <div className={styles.content}>
        <div>
          <span className={styles.amountContent}>
            <span>{getAmountKeyWord(total * -1)}</span>
            <b className={styles.amount}>{getAbs(total)} €</b></span>
          <div>{me}</div>
        </div>
        <div className={styles.transactionSummary}>
          {transactionRows}
        </div>
      </div>
    </div>
  </Card>);
};


export default TransactionItem
