import React from "react";
import HeadRoom from "react-headroom";
import { FontIcon } from "react-toolbox/lib/font_icon/index";
import { Main, NonLabelInputContainer } from "components/Container";
import { Input } from "react-toolbox/lib/input/index";
import LocationBuilder from "../../../../modules/navigation/LocationBuilder";
import withNavigation from "components/hoc/withNavigation";
import connect from "react-redux/es/connect/connect";
import { getAmount, getDebtee, getDescription, getShares } from "../../modules/addBillForm/selectors";
import Button from "components/Button";
import { addBill } from "../../modules/addBillForm/actions";
import { Selector, SelectorItem } from "components/Selector";
import BrandedAppBar from "components/BrandedAppBar/BrandedAppBar";
import { Heading } from "components/text";
import Section from "components/Section/Section";

const overview = ({push, ...props}) => {

  const selectedDebtors = (shares) => {
    return shares.filter(s => s.value);
  };

  const formatDebtors = (shares) => {
    let postFix = selectedDebtors(shares).length > 3 ? ", ..." : "";
    let debtors = selectedDebtors(shares).slice(0, 3).map(s => s.name).join(", ");

    return debtors + postFix;
  };

  const handleOnSubmit = () => {
    let billToAdd = {
      name: props.description,
      debtee: props.debtee,
      date: new Date(), // TODO: Add DatePicker,
      splitStrategy: "EQUAL",
      shares: selectedDebtors(props.shares)
        .map(share => {
          return {
            debtor: share.name,
            amount: share.amount
          }
        })
    };

    props.onSubmit(props.nobtId, billToAdd);
  };

  return (
    <div>

      <HeadRoom>
        <BrandedAppBar
          canGoBack={() => LocationBuilder.fromWindow().pop(1).apply(this.props.replace)}
          title="Add Bill"
        />
      </HeadRoom>

      <Main>
        <Heading>Add a bill</Heading>

        <Section caption="Subject" legend="Enter a descriptive name for what was paid.">
          <NonLabelInputContainer>
            <Input hint="Trip Snacks, Train Tickets, Beer, ..." value={props.description} onChange={props.onDescriptionChanged} />
          </NonLabelInputContainer>
        </Section>

        <Section caption="Total" legend="Enter the total of this bill.">
          <NonLabelInputContainer>
            <Input placeholder="13.37" type="number" value={props.amount} onChange={props.onAmountChanged} />
          </NonLabelInputContainer>
        </Section>

        <Section caption="Debtee" legend="Select the person who paid this bill.">
          <Selector>
            <SelectorItem
              leftIcon="person"
              caption={props.debtee == null ? "Select a Debtee" : props.debtee}
              onClick={() => LocationBuilder.fromWindow().push("debtee").apply(push)}
              legend={props.debtee == null ? " " : "paid the bill"}
              rightActions={[
                <FontIcon value="edit" />
              ]} />
          </Selector>
        </Section>

        <Section caption="Debtors" legend="Select who is involved in this bill.">
          <Selector>
            <SelectorItem
              leftIcon="group"
              caption={formatDebtors(props.shares)}
              legend={selectedDebtors(props.shares).length === 0 ? " " : selectedDebtors(props.shares).length + " persons"}
              onClick={() => LocationBuilder.fromWindow().push("debtors").apply(push)}
              rightActions={[
                <FontIcon value="edit" />
              ]} />
          </Selector>
        </Section>

        <Button raised primary onClick={handleOnSubmit} label="Add Bill"/>

      </Main>

    </div>
  );
};

export default withNavigation(connect(
  (state, ownProps) => ({
    description: getDescription(state),
    amount: getAmount(state),
    debtee: getDebtee(state),
    shares: getShares(state),
    nobtId: ownProps.params.nobtId,
  }),
  (dispatch) => ({
    onDescriptionChanged: description => dispatch({type: "DescriptionChanged", payload: {description}}),
    onAmountChanged: (amount) => dispatch({type: "AmountChanged", payload: {amount}}),
    onSubmit: (id, bill) => dispatch(addBill(id, bill)),
  })
)(overview));
