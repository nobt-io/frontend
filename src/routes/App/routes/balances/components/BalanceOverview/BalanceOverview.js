import React from "react";
import { connect } from "react-redux";
import { getBalances } from "../../../../modules/currentNobt/selectors";
import Amount from "../../../../../../components/Amount";
import AppBarTheme from "./AppBarTheme.scss";
import AppBar from "react-toolbox/lib/app_bar";
import HeadRoom from "react-headroom";
import { FontIcon } from "react-toolbox/lib/font_icon";
import LocationBuilder from "../../../../modules/navigation/LocationBuilder";
import { HOList } from "../../../../../../containers/HOList/HOList";
import styles from "./BalanceOverview.scss";

class BalanceOverview extends React.Component {

  state = {
    activeTab: 0
  };

  handleSwipe = ({direction}) => {

    const LEFT = 2;
    const RIGHT = 4;

    let newTabIndex = this.state.activeTab;

    if (direction == RIGHT && this.state.activeTab > 0) {
      newTabIndex -= 1;
    }

    if (direction == LEFT && (this.state.activeTab < (this.props.balances.length - 1) )) {
      newTabIndex += 1;
    }

    this.setState({activeTab: newTabIndex});
  };

  render = () => {
    return (
      <div>

        <HeadRoom>
          <AppBar
            theme={AppBarTheme}
            onLeftIconClick={() => LocationBuilder.fromWindow().pop(1).apply(this.props.replace)}
            leftIcon={
              <FontIcon
                value="keyboard_arrow_left"
              />
            }
            rightIcon={
              <FontIcon />
            }
            title="Balances"
          />
        </HeadRoom>

        <HOList
          className={styles.balanceList}
          items={this.props.balances}
          renderItem={ (balance) => (

            <div className={styles.balanceContainer} key={balance.me.name}>
              <div className={styles.debtor}>{balance.me.name}</div>

              <div className={styles.sign}>

                {balance.me.amount > 0 &&
                  <FontIcon value="add"/>
                }

                {balance.me.amount < 0 &&
                  <FontIcon value="remove"/>
                }

              </div>

              <div className={styles.amount}><Amount value={balance.me.amount}/></div>
            </div>
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
