import React, { useEffect } from 'react';
import { FontIcon } from 'react-toolbox-legacy/lib/font_icon/index';
import { Main } from 'components/Container';
import { CurrencyInput, Input, InputLegend } from 'components/Input/index';
import { connect } from 'react-redux';
import Button from 'components/Button/index';
import {
  addBill,
  amountChanged,
  descriptionChanged,
  focusIdChanged,
} from '../modules/actions';
import { List, SelectorItem } from 'components/List';
import BrandedAppBar from 'components/BrandedAppBar';
import { Caption, Heading, SubHeading } from 'components/text';
import { Section, SectionGroup } from 'components/Section/index';
import { AsyncActionStatus } from 'const/AsyncActionStatus';
import ForeignCurrencyButton from '../../../components/ForeignCurrencyButton';

import {
  getAddBillStatus,
  getAmount,
  getConversionInformation,
  getDebtee,
  getDescription,
  getFocusId,
  getForeignCurrency,
  getShares,
  getSharesWithValues,
  getSplitStrategy,
  isAmountErrorShown,
  isDebteeErrorShown,
  isDebtorsSelectionErrorShown,
  isDescriptionErrorShown,
} from '../modules/selectors';
import { getNobtCurrency } from '../../../modules/currentNobt/selectors';
import { useHistory, useParams } from 'react-router';
import usePaths from '../../../../../hooks/usePaths';
import { nobtIdPathVariable } from '../../../../../app';

const createBill = (props, nobtId) => {
  let billToAdd = {
    name: props.description,
    debtee: props.debtee,
    splitStrategy: props.splitStrategy,
    date: new Date(), // TODO: Add DatePicker
    conversionInformation: props.conversionInformation
      ? {
          foreignCurrency: props.conversionInformation.foreignCurrency.value,
          rate: props.conversionInformation.rate,
        }
      : null,
    shares: props.sharesWithValues.map(share => {
      return {
        debtor: share.name,
        amount: share.amount,
      };
    }),
  };
  props.onSubmit(nobtId, billToAdd);
};

const OverviewPage = props => {
  const { addBillStatus } = props;
  const history = useHistory();
  const paths = usePaths();
  const params = useParams();
  const nobtId = params[nobtIdPathVariable];

  useEffect(() => {
    if (addBillStatus === AsyncActionStatus.SUCCESSFUL) {
      props.invalidateNobtData();
      history.replace(paths.feed());
    }
  }, [addBillStatus]);

  return (
    <div>
      <BrandedAppBar canGoBack={true} />
      <Main>
        <Heading>Add a bill</Heading>
        <SubHeading>Add a bill to your nobt.</SubHeading>
        <SectionGroup>
          <Section>
            <Caption>What did you buy?</Caption>
            <Input
              placeholder="Trip Snacks, Train Tickets, Beer, ..."
              value={props.description}
              onChange={props.onDescriptionChanged}
              data-cy="description-input"
            />
            <InputLegend error={props.isDescriptionErrorShown}>
              Enter a descriptive name for what was paid.
            </InputLegend>
          </Section>
          <Section>
            <Caption>How much did it cost?</Caption>
            <CurrencyInput
              placeholder="13.37"
              value={props.amount}
              onChange={props.onAmountChanged}
              currency={
                (props.foreignCurrency || {}).value || props.nobtCurrency
              }
              data-cy="amount-input"
            />
            <InputLegend error={props.isAmountErrorShown}>
              Enter the total of this bill.
            </InputLegend>
            <ForeignCurrencyButton />
          </Section>
          <Section>
            <Caption>Who paid?</Caption>
            <List>
              <SelectorItem
                focus={props.focusId === 'debtee'}
                leftIcon="person"
                placeholder="Select a Debtee"
                data-cy={'select-debtee'}
                value={
                  props.debtee !== null ? props.debtee + ' paid the bill' : null
                }
                onClick={() => {
                  history.push(paths.newBill('debtee'));
                  props.onFocusIdChanged('debtee');
                }}
                rightActions={[<FontIcon key="edit" value="edit" />]}
              />
            </List>
            <InputLegend error={props.isDebteeErrorShown}>
              Select the person who paid this bill.
            </InputLegend>
          </Section>
          <Section>
            <Caption>Who is involved?</Caption>
            <List>
              <SelectorItem
                focus={props.focusId === 'debtor'}
                leftIcon="group"
                data-cy={'select-debtors'}
                placeholder="Nobody is involved"
                value={
                  props.sharesWithValues.length === 0
                    ? null
                    : props.sharesWithValues.length + ' persons are involved'
                }
                onClick={() => {
                  history.push(paths.newBill('debtors'));
                  props.onFocusIdChanged('debtor');
                }}
                rightActions={[<FontIcon key="edit" value="edit" />]}
              />
            </List>
            <InputLegend error={props.isDebtorsSelectionErrorShown}>
              Select who is involved in this bill.
            </InputLegend>
          </Section>
        </SectionGroup>
        <Button
          raised
          primary
          disabled={props.addBillStatus === AsyncActionStatus.IN_PROGRESS}
          onClick={() => createBill(props, nobtId)}
          label="add bill"
          icon="check_circle"
        />
      </Main>
    </div>
  );
};

export default connect(
  state => ({
    description: getDescription(state),
    amount: getAmount(state),
    debtee: getDebtee(state),
    shares: getShares(state),
    sharesWithValues: getSharesWithValues(state),
    conversionInformation: getConversionInformation(state),
    splitStrategy: getSplitStrategy(state),
    addBillStatus: getAddBillStatus(state),
    isDescriptionErrorShown: isDescriptionErrorShown(state),
    isAmountErrorShown: isAmountErrorShown(state),
    isDebteeErrorShown: isDebteeErrorShown(state),
    isDebtorsSelectionErrorShown: isDebtorsSelectionErrorShown(state),
    focusId: getFocusId(state),
    foreignCurrency: getForeignCurrency(state),
    nobtCurrency: getNobtCurrency(state),
  }),
  dispatch => ({
    onDescriptionChanged: description =>
      dispatch(descriptionChanged(description)),
    onAmountChanged: amount => dispatch(amountChanged(amount)),
    onSubmit: (id, bill) => dispatch(addBill(id, bill)),
    onFocusIdChanged: focusId => dispatch(focusIdChanged(focusId)),
  })
)(OverviewPage);
