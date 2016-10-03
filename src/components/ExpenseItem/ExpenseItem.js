import React from 'react'
import styles from './ExpenseItem.scss'
import Card from 'components/Card'
import Avatar from 'components/Avatar'

export const ExpenseItem = (props) => {

  const total = props.expense.shares.reduce((total, share) => total + share.amount, 0);
  const name = props.expense.name;
  const debtee = props.expense.debtee;
  const persons = props.expense.shares.map(s => (<span><b>{s.amount}€</b>{s.debtor}</span>));

  return (
    <Card>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.right}>{total} €</div>
          <div className={styles.left}>{name}</div>
        </div>
        <div className={styles.debtee}>
          <div className={styles.left}><Avatar size="15" name={debtee}></Avatar></div>
          <div className={styles.right}>paid by <b>{debtee}</b> on 20.01.1992</div>
        </div>

        <div>
          <div className={styles.debtors}>
            {persons}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExpenseItem
