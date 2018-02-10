import React from "react";
import { FontIcon } from "react-toolbox/lib/font_icon/index";
import { Main } from "components/Container/index";
import { Input, InputLegend, CurrencyInput } from "components/Input/index";
import LocationBuilder from "../../../modules/navigation/LocationBuilder";
import withNavigation from "components/hoc/withNavigation";
import connect from "react-redux/es/connect/connect";
import Button from "components/Button/index";
import { addBill } from "../modules/actions";
import { List, SelectorItem } from "components/List/index";
import BrandedAppBar from "components/BrandedAppBar/BrandedAppBar";
import { Heading, SubHeading, Caption } from "components/text/index";
import { Section, SectionGroup } from "components/Section/index";
import AsyncActionStatus from "const/AsyncActionStatus";
import { invalidateNobt } from "../../../modules/currentNobt/actions";
import withCtrlEnterAction from "components/hoc/withCtrlEnterAction";

import {
  getAddBillStatus,
  getAmount, getDebtee, getDescription, getShares, getSplitStrategy, isAmountErrorShown, isDebteeErrorShown, isDebtorsSelectionErrorShown,
  isDescriptionErrorShown, getSharesWithValues, getFocusId,
  isDescriptionValid
} from "../modules/selectors";

const goBack = (replace) => LocationBuilder.fromWindow().pop().apply(replace);

const addNobt = (props) => {
  let billToAdd = {
    name: props.description,
    debtee: props.debtee,
    splitStrategy: props.splitStrategy,
    date: new Date(), // TODO: Add DatePicker
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

class overview extends React.Component {

  componentWillReceiveProps(nextProps) {
    let newStatus = nextProps.addBillStatus;
    if (newStatus === AsyncActionStatus.SUCCESSFUL) {
      this.props.invalidateNobtData();
      LocationBuilder.fromWindow().pop().apply(this.props.replace);
    }
  }

  render = () => (
    <div>
      <BrandedAppBar
        onBackHandle={() => goBack(this.props.replace)}
        title="Add Bill"
      />
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
            <CurrencyInput placeholder="13.37" value={this.props.amount} onChange={this.props.onAmountChanged} />
            <InputLegend error={this.props.isAmountErrorShown}>Enter the total of this bill.</InputLegend>
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
        <Button raised primary onClick={() => addNobt(this.props)} label="Add Bill" icon="check_circle" />
      </Main>
    </div>
  )
}

export default withNavigation(connect(
  (state, ownProps) => ({
    description: getDescription(state),
    amount: getAmount(state),
    debtee: getDebtee(state),
    shares: getShares(state),
    sharesWithValues: getSharesWithValues(state),
    nobtId: ownProps.params.nobtId,
    splitStrategy: getSplitStrategy(state),
    addBillStatus: getAddBillStatus(state),
    isDescriptionErrorShown: isDescriptionErrorShown(state),
    isAmountErrorShown: isAmountErrorShown(state),
    isDebteeErrorShown: isDebteeErrorShown(state),
    isDebtorsSelectionErrorShown: isDebtorsSelectionErrorShown(state),
    focusId: getFocusId(state)
  }),
  (dispatch) => ({
    onDescriptionChanged: description => dispatch({type: "DescriptionChanged", payload: {description}}),
    onAmountChanged: (amount) => dispatch({type: "AmountChanged", payload: {amount}}),
    onSubmit: (id, bill) => dispatch(addBill(id, bill)),
    onFocusIdChanged: focusId => dispatch({type: "FocusIdChanged", payload: {focusId}}),
    invalidateNobtData: () => dispatch(invalidateNobt())
  })
)(withCtrlEnterAction((props) => addNobt(props), overview)));
