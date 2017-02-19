import React from "react";
import { connect } from "react-redux";
import { getBalances } from "../../../../modules/currentNobt/selectors";
import AppBarTheme from "./AppBarTheme.scss";
import AppBar from "react-toolbox/lib/app_bar";
import HeadRoom from "react-headroom";
import { FontIcon } from "react-toolbox/lib/font_icon";
import LocationBuilder from "../../../../modules/navigation/LocationBuilder";
import { Card, CardTitle, CardText } from "react-toolbox/lib/card";
import { Avatar, AvatarSize } from "components/Avatar";
import { ListItem } from "react-toolbox/lib/list";
import Amount from "components/Amount/Amount";
import { HOList } from "containers/HOList/HOList";
import { IconButton } from "react-toolbox/lib/button";
import BalanceCardTheme from "./BalanceCard/CardTheme.scss";
import BalanceCardTitleTheme from "./BalanceCard/CardTitleTheme.scss";
import ShareListItemTheme from "./BalanceCard/ShareListItemTheme.scss";
import CardTextTheme from "./BalanceCard/CardTextTheme.scss";
import ShareListTheme from "./BalanceCard/ShareListTheme.scss";
import AmountTheme from "./BalanceCard/AmountTheme.scss";
import BalanceCardListTheme from "./BalanceCardListTheme.scss";
import { Verb, Preposition } from "./DebtDirection";

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
          theme={BalanceCardListTheme}
          items={this.props.balances}
          renderItem={ (balance) => (
            <Card theme={BalanceCardTheme} key={balance.me.name}>
              <CardTitle
                theme={BalanceCardTitleTheme}
                title={balance.me.name}
                subtitle={<span><Verb person={balance.me} />&nbsp;<Preposition person={balance.me}/></span>}
              />
              <CardText theme={CardTextTheme}>
                <HOList
                  theme={ShareListTheme}
                  items={balance.persons}
                  renderItem={ person => (
                    <ListItem
                      theme={ShareListItemTheme}
                      ripple={false}
                      leftIcon={<Avatar name={person.name} size={AvatarSize.MEDIUM}/>}
                      key={person.name}
                      caption={person.name}
                      legend={<Amount theme={AmountTheme} value={person.amount} absolute={false}/>}
                      rightActions={ balance.me.amount < 0 && [
                        // TODO Implement instant settle up
                        <IconButton icon="payment" disabled/>
                      ]}
                    />
                  ) }
                />
              </CardText>
            </Card>
          ) }
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
