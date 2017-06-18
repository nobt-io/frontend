import * as React from "react";
import Amount from "../../../../../../../../components/Amount";
import { List, ListItem } from "react-toolbox/lib/list";
import HOList from "../../../../../../../../containers/HOList";
import { AppBar } from "react-toolbox/lib/app_bar/index";
import { Avatar } from "../../../../../../../../components/Avatar/index";
import { connect } from "react-redux";
import {
  getBills,
  getFetchNobtStatus,
  getSumOfPaidBills,
  makeGetBalance,
  makeGetPaidBills,
  makeGetRelatedBills
} from "../../../../../../modules/currentNobt/selectors";
import AmountTheme from "./AmountTheme.scss";
import AppBarTheme from "./AppBarTheme.scss";
import LocationBuilder from "../../../../../../modules/navigation/LocationBuilder";
import { FontIcon } from "react-toolbox/lib/font_icon/index";
import HeadRoom from "react-headroom";
import InfoMessageListTheme from "./InfoMessageListTheme.scss";
import InfoMessageCardTextTheme from "./InfoMessageCardTextTheme.scss";
import InfoMessageCardTitleTheme from "./InfoMessageCardTitleTheme.scss";
import AsyncActionStatus from "../../../../../../../../const/AsyncActionStatus";
import { Card, CardText, CardTitle } from "react-toolbox/lib/card";
import { FormattedMessage } from "react-intl";


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
              title={`${this.props.balance.me.name}`}
            />
          </HeadRoom>


          <Card>
            <CardTitle title="Summary" theme={InfoMessageCardTitleTheme} />
            <CardText theme={InfoMessageCardTextTheme}>
              <List theme={InfoMessageListTheme}>
                <ListItem
                  ripple={false}
                  leftIcon="info_outline"
                  itemContent={(<FormattedMessage
                      id="PersonBalance.paidBillsSummary"
                      defaultMessage="{name} {numberOfBills, plural,
                                            =0 {did not pay any bills}
                                            =1 {paid 1 bill ({totalAmount})}
                                            other {paid {numberOfBills} bills ({totalAmount})}}."
                      values={{
                        name: this.props.balance.me.name,
                        numberOfBills: this.props.paidBills.length,
                        totalAmount: <Amount value={this.props.sumOfPaidBills} absolute={true} />
                      }}
                    />
                  )}
                />

                <ListItem
                  ripple={false}
                  leftIcon="info_outline"
                  itemContent={
                    <FormattedMessage
                      id="PersonBalance.paidBillsSummary"
                      defaultMessage={
                        this.props.bills.length !== this.props.relatedBills.length ?
                          "{name} participates in {numberOfBills} of {allBills} bills." :
                          "{name} participates in all {allBills} bills."
                      }
                      values={{
                        name: this.props.balance.me.name,
                        allBills: this.props.bills.length,
                        numberOfBills: this.props.relatedBills.length
                      }}
                    />
                  }
                />

                <ListItem
                  ripple={false}
                  leftIcon="info_outline"
                  itemContent={(<FormattedMessage
                      id="PersonBalance.summary"
                      defaultMessage="{name} {verb} {amount} {preposition} {numberOfOtherPeople} {numberOfOtherPeople, plural,
                                                                                                =1 {person}
                                                                                                other {persons}}."
                      values={{
                        name: this.props.balance.me.name,
                        verb: this.props.balance.me.amount > 0 ? "gets" : "owes",
                        amount: <Amount value={this.props.balance.me.amount} absolute={true} />,
                        preposition: this.props.balance.me.amount > 0 ? "from" : "to",
                        numberOfOtherPeople: this.props.balance.persons.length
                      }}
                    />
                  )}
                />
              </List>
            </CardText>
          </Card>

          <Card>
            <CardTitle theme={InfoMessageCardTitleTheme}>Transactions</CardTitle>
            <CardText theme={InfoMessageCardTextTheme}>
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
            </CardText>
          </Card>
        </div>
      )}

    </div>
  )

}

const makeMapStateToProps = () => {
  const getBalance = makeGetBalance();
  const getPaidBills = makeGetPaidBills();
  const getRelatedBills = makeGetRelatedBills();

  return (state, props) => {
    let paidBills = getPaidBills(state, props);

    return {
      balance: getBalance(state, props),
      sumOfPaidBills: getSumOfPaidBills(paidBills),
      paidBills: paidBills,
      bills: getBills(state),
      relatedBills: getRelatedBills(state, props),
      fetchStatus: getFetchNobtStatus(state),
    }
  }
};

export default connect(
  makeMapStateToProps,
  (dispatch) => ({})
)(PersonBalance)
