import * as React from "react";
import { ListSubHeader } from "react-toolbox/lib/list/index";
import HOList from "../../../../containers/HOList/HOList";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { getSortedFeedItems } from "../../modules/currentNobt/selectors";
import withNavigation from "../../../../components/hoc/withNavigation";
import BillFeedItem from "./BillFeedItem";
import PaymentFeedItem from "./PaymentFeedItem";

const FeedSection = ({name, feedItems, renderFeedItem}) => (
  <div>
    <ListSubHeader caption={name} />
    {
      feedItems.map(renderFeedItem)
    }
  </div>
);


class Feed extends React.Component {

  getFeedSections = () => {

    const now = this.props.intl.now();

    const formatFeedItemDate = feedItem => this.props.intl.formatRelative(feedItem.date, {now});

    const relativeDates = this.props.feedItems.map(formatFeedItemDate);
    const distinctRelativeDates = [ ...new Set(relativeDates) ];

    return distinctRelativeDates.map(date => {
      return {
        relativeDate: date,
        feedItems: this.props.feedItems.filter(feedItem => formatFeedItemDate(feedItem) === date)
      }
    })
  };

  static feedItemRenderer = {
    'bill': (feedItem) => <BillFeedItem key={feedItem.id} feedItem={feedItem} />,
    'payment': (feedItem) => <PaymentFeedItem key={feedItem.id} feedItem={feedItem} />
  };

  renderFeedItem = (feedItem) => {
    return Feed.feedItemRenderer[ feedItem.type ](feedItem);
  };

  render = () => (

    <HOList
      items={this.getFeedSections()}
      renderItem={section =>
        <FeedSection
          key={section.relativeDate}
          name={section.relativeDate}
          feedItems={section.feedItems}
          renderFeedItem={this.renderFeedItem}
        >
        </FeedSection>
      }
    />
  )
}

const FeedWithIntl = injectIntl(Feed);
const FeedWithNavigationAndIntl = withNavigation(FeedWithIntl);
const connectedComponentFactory = connect((state) => ({feedItems: getSortedFeedItems(state)}), {});

export default connectedComponentFactory(FeedWithNavigationAndIntl);
