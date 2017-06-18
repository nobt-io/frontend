import React from "react";
import { connect } from "react-redux";
import { getBalances } from "../../../../modules/currentNobt/selectors";
import AppBarTheme from "./AppBarTheme.scss";
import AppBar from "react-toolbox/lib/app_bar";
import HeadRoom from "react-headroom";
import { FontIcon } from "react-toolbox/lib/font_icon";
import LocationBuilder from "../../../../modules/navigation/LocationBuilder";
import { Avatar, AvatarSize } from "components/Avatar";
import { ListItem } from "react-toolbox/lib/list";
import Amount from "components/Amount/Amount";
import { HOList } from "containers/HOList/HOList";
import { IconButton } from "react-toolbox/lib/button";
import AmountTheme from "./BalanceCard/AmountTheme.scss";

class BalanceOverview extends React.Component {

  state = {
    activeTab: 0
  };

  render = () => {
    return (
      <div>

        <HeadRoom>
          <AppBar
            theme={AppBarTheme}
            onLeftIconClick={() => LocationBuilder.fromWindow().pop(1).apply(this.props.replace)}
            leftIcon={<FontIcon value="keyboard_arrow_left" />}
            rightIcon={<FontIcon />}
            title="Balances"
          />
        </HeadRoom>

        <HOList
          items={this.props.balances}
          renderItem={ (balance) => (
            <ListItem
              leftActions={[
                <Avatar name={balance.me.name} medium />
              ]}
              ripple={false}
              key={balance.me.name}
              caption={balance.me.name}
              legend={<Amount theme={AmountTheme} value={balance.me.amount} absolute={false} />}
              rightActions={[
                (<IconButton icon="keyboard_arrow_right" onClick={() => LocationBuilder.fromWindow().push(balance.me.name).apply(this.props.replace)}/>),
              ]}
            />
          )}
        />

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
