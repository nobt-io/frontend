import * as React from 'react';
import Amount from '../../../../components/Amount/Amount';
import FeedItem from './FeedItem';
import { useHistory } from 'react-router-dom';
import usePaths from '../../../../hooks/usePaths';

const BillFeedItem = ({ feedItem }) => {
  const { id, debtee, subject, amount, deleted } = feedItem;
  const history = useHistory();
  const paths = usePaths();

  return (
    <FeedItem
      icon="receipt"
      deleted={deleted}
      caption={`${debtee} paid '${subject}'`}
      legend={<Amount value={amount} />}
      onClick={() => {
        history.push(paths.billDetails(id));
      }}
    />
  );
};

export default BillFeedItem;
