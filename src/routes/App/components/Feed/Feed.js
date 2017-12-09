import * as React from "react";
import { ListItem, ListSubHeader } from "react-toolbox/lib/list/index";
import HOList from "../../../../containers/HOList/HOList";
import Amount from "../../../../components/Amount/Amount";
import { IconButton } from "react-toolbox/lib/button/index";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { getSortedFeedItems } from "../../modules/currentNobt/selectors";

const FeedItemGroup = ({name, feedItems, renderFeedItem}) => (
  <div>
    <ListSubHeader caption={name} />
    {
      feedItems.map(renderFeedItem)
    }
  </div>
);

const FeedItem = ({icon, caption, legend, action}) => (
  <ListItem
    key={caption + legend}
    leftIcon={icon}
    caption={caption}
    legend={legend}
    rightActions={[
      action && <IconButton icon="chevron_right" onClick={action} />
    ]}
    ripple={false}
  />
);

const PaymentFeedItem = ({feedItem}) => {

  const {sender, recipient, amount, action} = feedItem;

  return (
    <FeedItem
      icon="payment"
      caption={`${sender} paid ${recipient}`}
      legend={<Amount value={amount} />}
      action={action}
    />
  )

};

const BillFeedItem = ({feedItem}) => {

  const {debtee, subject, amount, action} = feedItem;

  return (
    <FeedItem
      icon="receipt"
      caption={`${debtee} paid '${subject}'`}
      legend={<Amount value={amount} />}
      action={action}
    />
  )
};

class Feed extends React.Component {

  state = {
    feedItems: [
      {
        type: "payment",
        sender: "David",
        recipient: "Sarah",
        amount: 30,
        createdOn: new Date(2017, 11, 8)
      },
      {
        type: "bill",
        debtee: "Sarah",
        subject: "Mittagessen",
        amount: 35,
        createdOn: new Date(2017, 11, 7)
      },
      {
        type: "payment",
        sender: "Thomas",
        recipient: "David",
        amount: 20,
        createdOn: new Date(2017, 11, 7)
      },
      {
        type: "bill",
        debtee: "David",
        subject: "Bier",
        amount: 12.50,
        createdOn: new Date(2017, 11, 6)
      },
      {
        type: "bill",
        debtee: "David",
        subject: "Tanken",
        amount: 50,
        createdOn: new Date(2017, 11, 6)
      }
    ]
  };

  getGroupedFeedItems = () => {

    const now = Date.now();
    const formatFeedItemDate = feedItem => this.props.intl.formatRelative(feedItem.date, { now});

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
    'bill': (feedItem) => <BillFeedItem feedItem={feedItem} />,
    'payment': (feedItem) => <PaymentFeedItem feedItem={feedItem} />
  };

  renderFeedItem = (feedItem) => {
    return Feed.feedItemRenderer[ feedItem.type ](feedItem);
  };

  render = () => (

    <HOList
      items={this.getGroupedFeedItems()}
      renderItem={group =>
        <FeedItemGroup
          key={group.relativeDate}
          name={group.relativeDate}
          feedItems={group.feedItems}
          renderFeedItem={this.renderFeedItem}
        >
        </FeedItemGroup>
      }
    />
  )
}

const FeedWithIntl = injectIntl(Feed);

export default connect(
  (state) => ({
    feedItems: getSortedFeedItems(state)
  }), {})
(FeedWithIntl);
