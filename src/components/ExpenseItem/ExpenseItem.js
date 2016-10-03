import React from 'react'
import styles from './ExpenseItem.scss'

import Card from 'components/Card'
import {CardTitle} from 'react-toolbox/lib/card';

import Avatar from 'components/Avatar'
import PersonMoneyList from 'components/PersonMoneyList'

export const ExpenseItem = (props) => {

  const total = props.expense.shares.reduce((total, share) => total + share.amount, 0);
  const debtee = props.expense.debtee;
  const name = props.expense.name;
  const persons = props.expense.shares.map(s => ({name: s.debtor, amount: s.amount}));
  const personList = <PersonMoneyList persons={persons}/>;

  return (
    <Card>
      <div className={styles.title}>
        <CardTitle
          avatar={"https://api.adorable.io/avatars/20/"+debtee}
          title={name}
        >
          <div>paid by <b>{debtee}</b> on 20.01.1992</div>
        </CardTitle>
      </div>
      <div className={styles.container}>
        <div>
          {personList}
        </div>
      </div>
    </Card>
  );
};

export default ExpenseItem
