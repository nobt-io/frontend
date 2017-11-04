import React from "react";
import Amount from "components/Amount";
import HeadRoom from "react-headroom";
import { connect } from "react-redux";
import { makeGetBill } from "../../../../modules/currentNobt/selectors";
import { ListItem } from "react-toolbox/lib/list";
import Avatar from "components/Avatar";
import { AppBar } from "react-toolbox/lib/app_bar/index";
import { FontIcon } from "react-toolbox/lib/font_icon/index";
import LocationBuilder from "../../../../modules/navigation/LocationBuilder";
import { List, ListSubHeader } from "react-toolbox/lib/list/index";
import { FormattedDate, FormattedMessage } from "react-intl";
import DebtorAmountTheme from "./DebtorAmountTheme.scss";

class BillDetailPage extends React.Component {

  render = () => {

    const {bill} = this.props;
    const {debtee} = bill;

    return (
      <div>
        <HeadRoom>
          <AppBar
            onLeftIconClick={() => LocationBuilder.fromWindow().pop(1).apply(this.props.replace)}
            leftIcon={<FontIcon value="chevron_left" />}
            rightIcon={<FontIcon />}
            title={bill.name}
          />
        </HeadRoom>
        <div>
          <List>
            <ListSubHeader caption="Debtee" />
            <ListItem
              ripple={false}
              leftActions={[
                <Avatar name={debtee.name} small />
              ]}
              key={debtee.name}
              caption={`${debtee.name} paid this bill.`}
            />

            <ListItem
              ripple={false}
              leftActions={[
                <FontIcon value="payment" />
              ]}
              key="amount"
              caption={<FormattedMessage
                id="BillDetailPage.invoiceTotal"
                defaultMessage="The invoice total is {invoiceTotal}."
                values={{
                  invoiceTotal: <Amount value={debtee.amount} />
                }} />}
            />

            <ListItem
              key="Date_Created"
              ripple={false}
              caption={<FormattedMessage
                id="BillDetailPage.time_added_caption"
                defaultMessage="Added on {timestamp}."
                values={{
                  timestamp: <FormattedDate value={new Date(bill.createdOn)} year='numeric' month='long' day='2-digit' />
                }} />}
              leftActions={[
                <FontIcon value="access_time" />
              ]}
            />

          </List>
          <List>
            <ListSubHeader caption="Debtors" />

            {
              bill.debtors.map(debtor =>
                <ListItem
                  ripple={false}
                  leftActions={[
                    <Avatar name={debtor.name} small />
                  ]}
                  key={debtor.name}
                  caption={debtor.name}
                  rightActions={[
                    <Amount theme={DebtorAmountTheme} value={debtor.amount * (-1)} absolute={false} />
                  ]}
                />)
            }
          </List>
        </div>
      </div>
    );
  };
}

BillDetailPage.propTypes = {
  bill: React.PropTypes.object.isRequired
};

const makeMapStateToProps = () => {
  const getBill = makeGetBill();

  return (state, props) => {
    return {
      bill: getBill(state, props)
    };
  };
};

export default connect(
  makeMapStateToProps,
  (dispatch) => ({})
)(BillDetailPage);
