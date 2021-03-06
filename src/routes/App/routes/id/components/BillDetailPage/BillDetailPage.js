import React, { useEffect, useState } from 'react';
import Amount from 'components/Amount';
import { ListItem } from 'react-toolbox-legacy/lib/list';
import Avatar from 'components/Avatar';
import { AppBar } from 'react-toolbox-legacy/lib/app_bar/index';
import { FontIcon } from 'react-toolbox-legacy/lib/font_icon/index';
import { List, ListSubHeader } from 'react-toolbox-legacy/lib/list/index';
import { FormattedDate, FormattedMessage } from 'react-intl';
import DebtorAmountTheme from './DebtorAmountTheme.scss';
import { Page } from 'components/Container';
import ConfirmationDialog from 'components/ConfirmationDialog';
import { useHistory, useParams } from 'react-router';
import usePaths from '../../../../../../hooks/usePaths';
import { billDetailPathVariable } from '../../../../../../app';
import { useNobt } from '../../../../../../hooks/useNobt';
import Client from 'api';
import { mutate } from 'swr';

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

export default function BillDetailPage() {
  const params = useParams();
  const billId = params[billDetailPathVariable];
  const nobt = useNobt();
  const history = useHistory();
  const paths = usePaths();

  const bill = nobt.bill(billId);

  useEffect(() => {
    if (!bill) {
      history.replace(paths.feed());
    }
  }, [bill]);

  if (!bill) {
    return null;
  }

  const nobtCurrency = nobt.currency;
  const { debtee, deletedOn } = bill;

  const [
    showDeleteBillConfirmationDialog,
    setShowDeleteBillConfirmationDialog,
  ] = useState(false);

  const showDialog = () => setShowDeleteBillConfirmationDialog(true);
  const handelCancel = () => setShowDeleteBillConfirmationDialog(false);
  const handleConfirm = async () => {
    await Client.delete(bill.deleteLink);
    mutate(nobt.id);
    history.replace(paths.feed());
  };

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
        leftActions={[<FontIcon value={<i className={'fa fa-exchange'} />} />]}
        key="exchange"
        caption={
          <FormattedMessage
            id="BillDetailPage.invoiceTotal"
            defaultMessage="Converted from {originalAmount}."
            values={{
              originalAmount: (
                <Amount
                  currencyOverride={bill.conversionInformation.foreignCurrency}
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
        onLeftIconClick={() => history.goBack()}
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

        {bill.canBeDeleted && (
          <List>
            <ListSubHeader caption="Actions" />
            <ListItem
              primary
              leftIcon="delete"
              caption="Delete this bill"
              onClick={showDialog}
            />
          </List>
        )}

        <DeleteBillConfirmationDialog
          active={showDeleteBillConfirmationDialog}
          billName={bill.name}
          confirm={handleConfirm}
          cancel={handelCancel}
        />
      </Page>
    </div>
  );
}
