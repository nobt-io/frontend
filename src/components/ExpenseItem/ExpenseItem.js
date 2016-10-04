import React from 'react'
import styles from './ExpenseItem.scss'
import Card from 'components/Card'
import Avatar from 'components/Avatar'

export const ExpenseItem = (props) => {

  const total = props.expense.shares.reduce((total, share) => total + share.amount, 0);
  const name = props.expense.name;
  const debtee = props.expense.debtee;
  const debtorsAvatars = props.expense.shares.map(s => (<span className={styles.avatar}><Avatar name={s.debtor} size={20} fontSize={11}/></span>));

  return (
    <Card>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.description}>
            <span className={styles.amount}>{total} €</span>
            <span className={styles.name}>{name}</span>
          </div>
          <div className={styles.date}>20-01-2015</div>
          <div style={{clear: "both"}}></div>
        </div>
        <div className={styles.persons}>
          <div className={styles.right}>{debtorsAvatars}</div>
          <div className={styles.left}>
            <span className={styles.avatar}><Avatar name={debtee} size={30}/></span>
            <span><b>{debtee}</b> paid</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExpenseItem
