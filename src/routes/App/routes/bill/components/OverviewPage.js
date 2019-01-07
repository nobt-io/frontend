import React from "react";
import { FontIcon } from "react-toolbox-legacy/lib/font_icon/index";
import { Main } from "components/Container";
import { CurrencyInput, Input, InputLegend } from "components/Input/index";
import LocationBuilder from "../../../modules/navigation/LocationBuilder";
import withNavigation from "components/hoc/withNavigation";
import connect from "react-redux/es/connect/connect";
import Button from "components/Button/index";
import { addBill, amountChanged, descriptionChanged, focusIdChanged } from "../modules/actions";
import { List, SelectorItem } from "components/List";
import BrandedAppBar from "components/BrandedAppBar/BrandedAppBar";
import { Caption, Heading, SubHeading } from "components/text";
import { Section, SectionGroup } from "components/Section/index";
import AsyncActionStatus from "const/AsyncActionStatus";
import { invalidateNobt } from "../../../modules/currentNobt/actions";
import ForeignCurrencyButton from "../../../components/ForeignCurrencyButton"

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
	isDescriptionErrorShown
} from "../modules/selectors";
import { getNobtCurrency } from "../../../modules/currentNobt/selectors";

const createBill = (props) => {
  let billToAdd = {
    name: props.description,
    debtee: props.debtee,
    splitStrategy: props.splitStrategy,
    date: new Date(), // TODO: Add DatePicker
    conversionInformation: {
        foreignCurrency: props.conversionInformation.foreignCurrency.value,
        rate: props.conversionInformation.rate
    },
    shares: props.sharesWithValues
      .map(share => {
        return {
          debtor: share.name,
          amount: share.amount
        }
      })
  };
  props.onSubmit(props.nobtId, billToAdd);
};

class OverviewPage extends React.Component {

  componentWillReceiveProps(nextProps) {
    let newStatus = nextProps.addBillStatus;
    if (newStatus === AsyncActionStatus.SUCCESSFUL) {
      this.props.invalidateNobtData();
      LocationBuilder.fromWindow().pop().apply(this.props.replace);
    }
  }

  render = () => (
    <div>
      <BrandedAppBar canGoBack={true} />
      <Main>
        <Heading>Add a bill</Heading>
        <SubHeading>Add a bill to your nobt.</SubHeading>
        <SectionGroup>
          <Section>
            <Caption>What did you buy?</Caption>
            <Input placeholder="Trip Snacks, Train Tickets, Beer, ..." value={this.props.description} onChange={this.props.onDescriptionChanged} />
            <InputLegend error={this.props.isDescriptionErrorShown}>Enter a descriptive name for what was paid.</InputLegend>
          </Section>
          <Section>
            <Caption>How much did it cost?</Caption>
            <CurrencyInput placeholder="13.37" value={this.props.amount} onChange={this.props.onAmountChanged} currency={(this.props.foreignCurrency || {}).value || this.props.nobtCurrency} />
            <InputLegend error={this.props.isAmountErrorShown}>Enter the total of this bill.</InputLegend>
            <ForeignCurrencyButton />
          </Section>
          <Section>
            <Caption>Who paid?</Caption>
            <List>
              <SelectorItem
                focus={this.props.focusId === "debtee"}
                leftIcon="person"
                placeholder="Select a Debtee"
                value={this.props.debtee !== null ? this.props.debtee + " paid the bill" : null}
                onClick={() => {
                  LocationBuilder.fromWindow().push("debtee").apply(this.props.push);
                  this.props.onFocusIdChanged("debtee");
                }}
                rightActions={[
                  <FontIcon key="edit" value="edit" />
                ]} />
            </List>
            <InputLegend error={this.props.isDebteeErrorShown}>Select the person who paid this bill.</InputLegend>
          </Section>
          <Section>
            <Caption>Who is involved?</Caption>
            <List>
              <SelectorItem
                focus={this.props.focusId === "debtor"}
                leftIcon="group"
                placeholder="Nobody is involved"
                value={this.props.sharesWithValues.length === 0 ? null : this.props.sharesWithValues.length + " persons are involved"}
                onClick={() => {
                  LocationBuilder.fromWindow().push("debtors").apply(this.props.push);
                  this.props.onFocusIdChanged("debtor");
                }}
                rightActions={[
                  <FontIcon key="edit" value="edit" />
                ]} />
            </List>
            <InputLegend error={this.props.isDebtorsSelectionErrorShown}>Select who is involved in this bill.</InputLegend>
          </Section>
        </SectionGroup>
        <Button raised primary onClick={() => createBill(this.props)} label="Add Bill" icon="check_circle" />
      </Main>
    </div>
  )
}

export default withNavigation(connect(
  (state, props) => ({
    description: getDescription(state),
    amount: getAmount(state),
    debtee: getDebtee(state),
    shares: getShares(state),
    sharesWithValues: getSharesWithValues(state),
    conversionInformation: getConversionInformation(state),
    nobtId: props.match.params.nobtId,
    splitStrategy: getSplitStrategy(state),
    addBillStatus: getAddBillStatus(state),
    isDescriptionErrorShown: isDescriptionErrorShown(state),
    isAmountErrorShown: isAmountErrorShown(state),
    isDebteeErrorShown: isDebteeErrorShown(state),
    isDebtorsSelectionErrorShown: isDebtorsSelectionErrorShown(state),
    focusId: getFocusId(state),
    foreignCurrency: getForeignCurrency(state),
    nobtCurrency: getNobtCurrency(state)
  }),
  (dispatch) => ({
    onDescriptionChanged: description => dispatch(descriptionChanged(description)),
    onAmountChanged: (amount) => dispatch(amountChanged(amount)),
    onSubmit: (id, bill) => dispatch(addBill(id, bill)),
    onFocusIdChanged: focusId => dispatch(focusIdChanged(focusId)),
    invalidateNobtData: () => dispatch(invalidateNobt())
  })
)(OverviewPage));
