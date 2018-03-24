import React from "react";
import Amount from "components/Amount";
import HeadRoom from "react-headroom";
import { connect } from "react-redux";
import { makeCanBillBeDeleted, makeGetBill } from "../../../../modules/currentNobt/selectors";
import { ListItem } from "react-toolbox/lib/list";
import Avatar from "components/Avatar";
import { AppBar } from "react-toolbox/lib/app_bar/index";
import { FontIcon } from "react-toolbox/lib/font_icon/index";
import LocationBuilder from "../../../../modules/navigation/LocationBuilder";
import { List, ListSubHeader } from "react-toolbox/lib/list/index";
import { FormattedDate, FormattedMessage } from "react-intl";
import DebtorAmountTheme from "./DebtorAmountTheme.scss";
import { Page } from "components/Container";
import { Snackbar } from "react-toolbox";
import { deleteExpense } from "../../../../modules/currentNobt/actions";
import withNavigation from "../../../../../../components/hoc/withNavigation";
import ConfirmationDialog from "components/ConfirmationDialog";

const DeleteBillConfirmationDialog = ({active, billName, confirm, cancel}) => (<ConfirmationDialog
  active={active}
  title={`Delete '${billName}'?`}
  confirm={confirm}
  cancel={cancel}>
  <p>Do you really want to delete this bill? <br />
    This cannot be undone.</p>
</ConfirmationDialog>);

class BillDetailPage extends React.Component {

  state = {
    showDeleteBillConfirmationDialog: false
  };

  render = () => {

    if (!this.props.bill) {
      LocationBuilder.fromWindow().pop().apply(this.props.replace);
      return null;
    }

    const {bill} = this.props;
    const {debtee} = bill;

    return (
      <div>
        <HeadRoom>
          <AppBar
            onLeftIconClick={() => LocationBuilder.fromWindow().pop(1).apply(this.props.replace)}
            leftIcon={<FontIcon value="chevron_left" />}
            title={bill.name}
          />
        </HeadRoom>
        <Page>
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

          <List>
            <ListSubHeader caption="Actions" />
            <ListItem
              primary
              leftIcon="delete"
              caption="Delete this bill"
              onClick={this.showDialog}
            />
          </List>

          <DeleteBillConfirmationDialog
            active={this.state.showDeleteBillConfirmationDialog}
            billName={this.props.bill.name}
            confirm={this.handleConfirm}
            cancel={this.handelCancel} />

        </Page>
      </div>
    );
  };

  showDialog = () => this.setState({showDeleteBillConfirmationDialog: true});

  handelCancel = () => this.setState({showDeleteBillConfirmationDialog: false});
  handleConfirm = () => this.props.deleteBill(this.props.bill);

}

const makeMapStateToProps = () => {
  const getBill = makeGetBill();
  const canBillBeDeleted = makeCanBillBeDeleted();

  return (state, props) => {
    return {
      bill: getBill(state, props),
      canBillBeDeleted: canBillBeDeleted(state, props)
    };
  };
};

export default connect(
  makeMapStateToProps,
  (dispatch) => ({
    deleteBill: (e) => dispatch(deleteExpense(e))
  })
)(withNavigation(BillDetailPage));
