import React from "react";
import TransactionItem from "components/TransactionItem";

export const TransactionList = (props) => {
  var transactionItem = props.transactions.map(t => (<TransactionItem key={t.me.name} transaction={t}/>));
  return <div>{transactionItem}</div>;

};

TransactionList.propTypes = {
  transactions: React.PropTypes.array.isRequired
};

export default TransactionList
