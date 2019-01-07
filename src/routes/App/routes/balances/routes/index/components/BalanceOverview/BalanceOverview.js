import React from "react";
import { connect } from "react-redux";
import { getBalances } from "../../../../../../modules/currentNobt/selectors";
import LocationBuilder from "../../../../../../modules/navigation/LocationBuilder";
import Avatar from "components/Avatar/index";
import { ListItem } from "react-toolbox-legacy/lib/list";
import Amount from "components/Amount/Amount";
import { HOList } from "containers/HOList/HOList";
import { IconButton } from "react-toolbox-legacy/lib/button";
import AmountTheme from "../../../../themes/AmountTheme.scss";
import { AppBar } from "react-toolbox-legacy/lib/app_bar/index";
import { FontIcon } from "react-toolbox-legacy/lib/font_icon/index";
import { SubTitle, Title } from "components/text/index";
import { Page } from "components/Container";

class BalanceOverview extends React.Component {

  state = {
    activeTab: 0
  };

  render = () => {
    return (
      <div>

          <AppBar
            onLeftIconClick={() => LocationBuilder.fromWindow().pop(1).apply(this.props.replace)}
            leftIcon={<FontIcon value="chevron_left" />}
            rightIcon={<FontIcon />}
            title="Balances"
          />

        <Page>
          <Title>Balance Overview</Title>
          <SubTitle>The balances of all users in this Nobt.</SubTitle>

          <HOList
            items={this.props.balances}
            renderItem={(balance) => (
              <ListItem
                leftActions={[
                  <Avatar name={balance.me.name} medium />
                ]}
                key={balance.me.name}
                caption={balance.me.name}
                legend={<Amount theme={AmountTheme} value={balance.me.amount} absolute={false} />}
                rightActions={[
                  (<IconButton icon="chevron_right" />),
                ]}
                onClick={() => LocationBuilder.fromWindow().push(balance.me.name).apply(this.props.push)}
              />
            )}
          />
        </Page>

      </div>
    )
  }
}

export default connect(
  (state) => ({
    balances: getBalances(state)
  }),
  {}
)(BalanceOverview)
