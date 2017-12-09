import * as React from "react";
import Amount from "../../../../components/Amount/Amount";
import FeedItem from "./FeedItem";

const PaymentFeedItem = ({feedItem}) => {

  const {sender, recipient, amount} = feedItem;

  return (
    <FeedItem
      icon="payment"
      caption={`${sender} paid ${recipient}`}
      legend={<Amount value={amount} />}
    />
  )

};

export default PaymentFeedItem;
