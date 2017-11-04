import * as React from "react";
import Amount from "components/Amount/index";
import { List, ListItem } from "react-toolbox/lib/list";
import HOList from "../../../../../../../../containers/HOList";
import { AppBar } from "react-toolbox/lib/app_bar/index";
import Avatar from "components/Avatar/index";
import { connect } from "react-redux";
import {
  getBills,
  getFetchNobtStatus,
  getSumOfPaidBills,
  makeGetBalance,
  makeGetPaidBills,
  makeGetRelatedBills
} from "../../../../../../modules/currentNobt/selectors";
import LocationBuilder from "../../../../../../modules/navigation/LocationBuilder";
import { FontIcon } from "react-toolbox/lib/font_icon/index";
import HeadRoom from "react-headroom";
import InfoMessageListTheme from "./InfoMessageListTheme.scss";
import AsyncActionStatus from "../../../../../../../../const/AsyncActionStatus";
import { FormattedMessage } from "react-intl";
import { SubTitle, Title } from "components/text";
import AmountTheme from "../../../../themes/AmountTheme.scss"

class PersonBalance extends React.Component {

  render = () => (
    <div>

      {this.props.fetchStatus === AsyncActionStatus.SUCCESSFUL && (
        <div>

          <HeadRoom>
            <AppBar
              onLeftIconClick={() => LocationBuilder.fromWindow().pop(1).apply(this.props.replace)}
              leftIcon={<FontIcon value="chevron_left" />}
              rightIcon={<FontIcon />}
              title={`${this.props.balance.me.name}`}
            />
          </HeadRoom>

          <div>
            <Title>Summary</Title>

            <List theme={InfoMessageListTheme}>
              <ListItem
                ripple={false}
                leftIcon="info_outline"
                caption={<FormattedMessage
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
                }
              />

              <ListItem
                ripple={false}
                leftIcon="info_outline"
                caption={
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
            </List>
          </div>

          <div>
            <Title>Transactions</Title>
            <SubTitle>
              <FormattedMessage
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
            </SubTitle>

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
