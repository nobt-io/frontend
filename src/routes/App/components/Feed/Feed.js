import * as React from 'react';
import { ListSubHeader } from 'react-toolbox-legacy/lib/list/index';
import HOList from '../../../../containers/HOList/HOList';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { getSortedFeedItems } from '../../modules/currentNobt/selectors';
import BillFeedItem from './BillFeedItem';
import PaymentFeedItem from './PaymentFeedItem';

const FeedSection = ({ name, feedItems, renderFeedItem }) => (
  <div>
    <ListSubHeader caption={name} />
    {feedItems.map(renderFeedItem)}
  </div>
);

const Feed = props => {
  const getFeedSections = () => {
    const now = props.intl.now();

    const formatFeedItemDate = feedItem =>
      props.intl.formatRelative(feedItem.date, { now });

    const relativeDates = props.feedItems.map(formatFeedItemDate);
    const distinctRelativeDates = [...new Set(relativeDates)];

    return distinctRelativeDates.map(date => {
      return {
        relativeDate: date,
        feedItems: props.feedItems.filter(
          feedItem => formatFeedItemDate(feedItem) === date
        ),
      };
    });
  };

  const feedItemRenderer = {
    bill: feedItem => <BillFeedItem key={feedItem.id} feedItem={feedItem} />,
    payment: feedItem => (
      <PaymentFeedItem key={feedItem.id} feedItem={feedItem} />
    ),
  };

  const renderFeedItem = feedItem => {
    return feedItemRenderer[feedItem.type](feedItem);
  };

  return (
    <HOList
      items={getFeedSections()}
      renderItem={section => (
        <FeedSection
          key={section.relativeDate}
          name={section.relativeDate}
          feedItems={section.feedItems}
          renderFeedItem={renderFeedItem}
        />
      )}
    />
  );
};

const FeedWithIntl = injectIntl(Feed);
const connectedComponentFactory = connect(
  state => ({ feedItems: getSortedFeedItems(state) }),
  {}
);

export default connectedComponentFactory(FeedWithIntl);
