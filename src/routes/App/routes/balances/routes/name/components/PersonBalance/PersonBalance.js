import * as React from "react";
import Amount from "../../../../../../../../components/Amount";
import { ListItem } from "react-toolbox/lib/list";
import HOList from "../../../../../../../../containers/HOList";
import { AppBar } from "react-toolbox/lib/app_bar/index";
import { Avatar } from "../../../../../../../../components/Avatar/index";
import { connect } from "react-redux";
import { getFetchNobtStatus, makeGetBalance } from "../../../../../../modules/currentNobt/selectors";
import AmountTheme from "./AmountTheme.scss";
import AppBarTheme from "./AppBarTheme.scss";
import LocationBuilder from "../../../../../../modules/navigation/LocationBuilder";
import { FontIcon } from "react-toolbox/lib/font_icon/index";
import HeadRoom from "react-headroom";
import AsyncActionStatus from "../../../../../../../../const/AsyncActionStatus";


class PersonBalance extends React.Component {

  render = () => (
    <div>

      {this.props.fetchStatus === AsyncActionStatus.SUCCESSFUL && (
        <div>

          <HeadRoom>
            <AppBar
              theme={AppBarTheme}
              onLeftIconClick={() => LocationBuilder.fromWindow().pop(1).apply(this.props.replace)}
              leftIcon={<FontIcon value="keyboard_arrow_left" />}
              rightIcon={<FontIcon />}
              title={`Balance of ${this.props.balance.me.name}`}
            />
          </HeadRoom>

          <HOList
            items={this.props.balance.persons}
            renderItem={ (transaction) => (
              <ListItem
                leftActions={[
                  <Avatar name={transaction.name} medium />
                ]}
                ripple={false}
                key={transaction.name}
                caption={transaction.name}
                legend={<Amount theme={AmountTheme} value={transaction.amount} absolute={false} />}
              />
            )}
          />
        </div>
      )}

    </div>
  )

}

const makeMapStateToProps = () => {
  const getBalance = makeGetBalance();

  return (state, props) => {
    return {
      balance: getBalance(state, props),
      fetchStatus: getFetchNobtStatus(state),
    }
  }
};

export default connect(
  makeMapStateToProps,
  (dispatch) => ({})
)(PersonBalance)
