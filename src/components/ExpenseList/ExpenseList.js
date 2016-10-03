import React from 'react'
import ExpenseItem from 'components/ExpenseItem'

export const ExpenseList = (props) => {

  var expenses = props.expenses || [];
  console.log(expenses);
  var expenseItem = expenses.map(e => (<ExpenseItem expense={e}></ExpenseItem>));
  return <div>{expenseItem}</div>;
};

export default ExpenseList
