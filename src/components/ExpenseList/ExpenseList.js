import React from "react";
import ExpenseItem from "components/ExpenseItem";

export const ExpenseList = (props) => {
  var expenseItem = props.expenses.map(e => (<ExpenseItem key={e.id} expense={e} />));
  return <div>{expenseItem}</div>;
};

ExpenseList.propTypes = {
  expenses: React.PropTypes.array.isRequired
};

export default ExpenseList
