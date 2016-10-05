import React from 'react'
import TransactionItem from 'components/TransactionItem'

export const TransactionList = (props) => {
  var transactions = props.transactions || [];
  var transactionItem = transactions.map(t => (<TransactionItem key={t.me.name} transaction={t} />));
  return <div>{transactionItem}</div>;

};

export default TransactionList
