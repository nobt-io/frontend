import React from 'react'
import TransactionItem from 'components/TransactionItem'

export const TransactionList = (props) => {
  var transactions = props.transactions || [];
  var transactionItem = transactions.map(t => (<TransactionItem transaction={t}></TransactionItem>));
  return <div>{transactionItem}</div>;

};

export default TransactionList
