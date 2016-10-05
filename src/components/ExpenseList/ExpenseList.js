import React from "react";
import ExpenseItem from "components/ExpenseItem";

export const ExpenseList = (props) => {
  var expenseItem = props.expenses.map(e => (<ExpenseItem expense={e}></ExpenseItem>));
  return <div>{expenseItem}</div>;
};

ExpenseList.propTypes = {
  expenses: React.PropTypes.array.isRequired
};

export default ExpenseList
