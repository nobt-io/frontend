import React from 'react';
import Amount from 'components/Amount';
import { connect } from 'react-redux';
import {
  getNobtCurrency,
  makeCanBillBeDeleted,
  makeGetBill,
} from '../../../../modules/currentNobt/selectors';
import { ListItem } from 'react-toolbox-legacy/lib/list';
import Avatar from 'components/Avatar';
import { AppBar } from 'react-toolbox-legacy/lib/app_bar/index';
import { FontIcon } from 'react-toolbox-legacy/lib/font_icon/index';
import LocationBuilder from '../../../../modules/navigation/LocationBuilder';
import { List, ListSubHeader } from 'react-toolbox-legacy/lib/list/index';
import { FormattedDate, FormattedMessage } from 'react-intl';
import DebtorAmountTheme from './DebtorAmountTheme.scss';
import { Page } from 'components/Container';
import { Snackbar } from 'react-toolbox-legacy';
import { deleteExpense } from '../../../../modules/currentNobt/actions';
import withNavigation from '../../../../../../components/hoc/withNavigation';
import ConfirmationDialog from 'components/ConfirmationDialog';

const DeleteBillConfirmationDialog = ({
  active,
  billName,
  confirm,
  cancel,
}) => (
  <ConfirmationDialog
    active={active}
    title={`Delete '${billName}'?`}
    confirm={confirm}
    cancel={cancel}
  >
    <p>
      Do you really want to delete this bill? <br />
      This cannot be undone.
    </p>
  </ConfirmationDialog>
);

class BillDetailPage extends React.Component {
  state = {
    showDeleteBillConfirmationDialog: false,
  };

  render = () => {
    if (!this.props.bill) {
      LocationBuilder.fromWindow()
        .pop()
        .apply(this.props.replace);
      return null;
    }

    const { bill, nobtCurrency } = this.props;
    const { debtee, deletedOn } = bill;

    const items = [
      <ListItem
        ripple={false}
        leftActions={[<Avatar name={debtee.name} small />]}
        key={debtee.name}
        caption={`${debtee.name} paid this bill.`}
      />,
      <ListItem
        key="Date_Created"
        ripple={false}
        caption={
          <FormattedMessage
            id="BillDetailPage.time_added_caption"
            defaultMessage="Added on {timestamp}."
            values={{
              timestamp: (
                <FormattedDate
                  value={new Date(bill.createdOn)}
                  year="numeric"
                  month="long"
                  day="2-digit"
                />
              ),
            }}
          />
        }
        leftActions={[<FontIcon value="access_time" />]}
      />,
      <ListItem
        ripple={false}
        leftActions={[<FontIcon value="payment" />]}
        key="amount"
        caption={
          <FormattedMessage
            id="BillDetailPage.invoiceTotal"
            defaultMessage="The invoice total is {invoiceTotal}."
            values={{
              invoiceTotal: <Amount value={debtee.amount} />,
            }}
          />
        }
      />,
    ];

    if (bill.conversionInformation.foreignCurrency !== nobtCurrency) {
      items.push(
        <ListItem
          ripple={false}
          leftActions={[
            <FontIcon value={<i className={'fa fa-exchange'} />} />,
          ]}
          key="exchange"
          caption={
            <FormattedMessage
              id="BillDetailPage.invoiceTotal"
              defaultMessage="Converted from {originalAmount}."
              values={{
                originalAmount: (
                  <Amount
                    currencyOverride={
                      bill.conversionInformation.foreignCurrency
                    }
                    value={debtee.amount * bill.conversionInformation.rate}
                  />
                ),
              }}
            />
          }
        />
      );
    }

    if (deletedOn) {
      items.push(
        <ListItem
          key="Date_Deleted"
          ripple={false}
          caption={
            <FormattedMessage
              id="BillDetailPage.time_added_caption"
              defaultMessage="Deleted on {timestamp}."
              values={{
                timestamp: (
                  <FormattedDate
                    value={new Date(deletedOn)}
                    year="numeric"
                    month="long"
                    day="2-digit"
                  />
                ),
              }}
            />
          }
          leftActions={[<FontIcon value="delete" />]}
        />
      );
    }

    return (
      <div>
        <AppBar
          onLeftIconClick={() => this.props.goBack()}
          leftIcon={<FontIcon value="chevron_left" />}
          title={bill.name}
        />
        <Page>
          <List>
            <ListSubHeader caption="Debtee" />
            {items}
          </List>
          <List>
            <ListSubHeader caption="Debtors" />

            {bill.debtors.map(debtor => (
              <ListItem
                ripple={false}
                leftActions={[<Avatar name={debtor.name} small />]}
                key={debtor.name}
                caption={debtor.name}
                rightActions={[
                  <Amount
                    theme={DebtorAmountTheme}
                    value={debtor.amount * -1}
                    absolute={false}
                  />,
                ]}
              />
            ))}
          </List>

          {this.props.canBillBeDeleted && (
            <List>
              <ListSubHeader caption="Actions" />
              <ListItem
                primary
                leftIcon="delete"
                caption="Delete this bill"
                onClick={this.showDialog}
              />
            </List>
          )}

          <DeleteBillConfirmationDialog
            active={this.state.showDeleteBillConfirmationDialog}
            billName={this.props.bill.name}
            confirm={this.handleConfirm}
            cancel={this.handelCancel}
          />
        </Page>
      </div>
    );
  };

  showDialog = () => this.setState({ showDeleteBillConfirmationDialog: true });

  handelCancel = () =>
    this.setState({ showDeleteBillConfirmationDialog: false });
  handleConfirm = () => this.props.deleteBill(this.props.bill);
}

const makeMapStateToProps = () => {
  const getBill = makeGetBill();
  const canBillBeDeleted = makeCanBillBeDeleted();

  return (state, props) => {
    return {
      bill: getBill(state, props),
      nobtCurrency: getNobtCurrency(state),
      canBillBeDeleted: canBillBeDeleted(state, props),
    };
  };
};

export default connect(
  makeMapStateToProps,
  dispatch => ({
    deleteBill: e => dispatch(deleteExpense(e)),
  })
)(withNavigation(BillDetailPage));
