import LocationBuilder from '../../modules/navigation/LocationBuilder';
import withNavigation from '../../../../components/hoc/withNavigation';
import * as React from 'react';
import Amount from '../../../../components/Amount/Amount';
import FeedItem from './FeedItem';

const BillFeedItem = ({ feedItem, push }) => {
  const { id, debtee, subject, amount, deleted } = feedItem;

  return (
    <FeedItem
      icon="receipt"
      deleted={deleted}
      caption={`${debtee} paid '${subject}'`}
      legend={<Amount value={amount} />}
      onClick={() =>
        LocationBuilder.fromWindow()
          .push(id)
          .apply(push)
      }
    />
  );
};

export default withNavigation(BillFeedItem);
