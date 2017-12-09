import * as React from "react";
import { ListItem, ListSubHeader } from "react-toolbox/lib/list/index";
import HOList from "../../../../containers/HOList/HOList";
import Amount from "../../../../components/Amount/Amount";
import { IconButton } from "react-toolbox/lib/button/index";
import { injectIntl } from "react-intl";

const CashFlowGroup = ({name, cashFlows, renderCashFlow}) => (
  <div>
    <ListSubHeader caption={name} />
    {
      cashFlows.map(renderCashFlow)
    }
  </div>
);

const CashFlow = ({icon, caption, amount, action}) => (
  <ListItem
    leftIcon={icon}
    caption={caption}
    legend={<Amount value={amount} />}
    rightActions={[
      action && <IconButton icon="chevron_right" onClick={action} />
    ]}
    ripple={false}
  />
);

class Feed extends React.Component {

  state = {
    cashFlows: [
      {
        icon: "payment",
        caption: "David paid Sarah",
        amount: 30,
        createdOn: new Date(2017, 11, 8)
      },
      {
        icon: "receipt",
        caption: "Sarah paid 'Mittagessen'",
        amount: 35,
        createdOn: new Date(2017, 11, 7)
      },
      {
        icon: "payment",
        caption: "Thomas paid David",
        amount: 20,
        createdOn: new Date(2017, 11, 7)
      },
      {
        icon: "receipt",
        caption: "David paid 'Bier'",
        amount: 12.50,
        createdOn: new Date(2017, 11, 6)
      },
      {
        icon: "receipt",
        caption: "David paid 'Tanken'",
        amount: 50,
        createdOn: new Date(2017, 11, 6)
      }
    ]
  };

  getGroupedCashFlows = () => {

    let now = Date.now();

    let relativeDates = this.state.cashFlows.map(cashFlow => this.props.intl.formatRelative(cashFlow.createdOn, {
      now
    }));

    let distinctRelativeDates = [...new Set(relativeDates)];

    return distinctRelativeDates.map(date => {
      return {
        relativeDate: date,
        cashFlows: this.state.cashFlows.filter(cashFlow => this.props.intl.formatRelative(cashFlow.createdOn, {now}) === date)
      }
    })
  };

  render = () => (

    <HOList
      items={this.getGroupedCashFlows()}
      renderItem={group =>
        <CashFlowGroup
          name={group.relativeDate}
          cashFlows={group.cashFlows}
          renderCashFlow={cashFlow => <CashFlow
            icon={cashFlow.icon}
            caption={cashFlow.caption}
            amount={cashFlow.amount}
            action={() => {}}
          />}
        >
        </CashFlowGroup>
      }
    />
  )
}

export default injectIntl(Feed);
