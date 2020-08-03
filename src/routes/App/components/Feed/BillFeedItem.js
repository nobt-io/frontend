import * as React from 'react';
import Amount from '../../../../components/Amount/Amount';
import FeedItem from './FeedItem';
import usePaths from '../../../../hooks/usePaths';

const BillFeedItem = ({ feedItem }) => {
  const { id, debtee, subject, amount, deleted } = feedItem;
  const paths = usePaths();

  return (
    <FeedItem
      link={paths.billDetails(id)}
      icon="receipt"
      deleted={deleted}
      caption={`${debtee} paid '${subject}'`}
      legend={<Amount value={amount} />}
    />
  );
};

export default BillFeedItem;
