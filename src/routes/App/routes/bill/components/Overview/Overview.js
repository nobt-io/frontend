import React from "react";
import HeadRoom from "react-headroom";
import { FontIcon } from "react-toolbox/lib/font_icon/index";
import { Main } from "components/Container";
import { Input, InputLegend } from "components/Input";
import LocationBuilder from "../../../../modules/navigation/LocationBuilder";
import withNavigation from "components/hoc/withNavigation";
import connect from "react-redux/es/connect/connect";
import { getAmount, getDebtee, getDescription, getShares } from "../../modules/addBillForm/selectors";
import Button from "components/Button";
import { addBill } from "../../modules/addBillForm/actions";
import { Selector, SelectorItem } from "components/Selector";
import BrandedAppBar from "components/BrandedAppBar/BrandedAppBar";
import { Heading, SubHeading, Caption, Legend } from "components/text";
import { Section, SectionGroup } from "components/Section";

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
        <SubHeading>Add a bill to your nobt.</SubHeading>
        <SectionGroup>
          <Section>
            <Caption>What did you buy?</Caption>
            <Input placeholder="Trip Snacks, Train Tickets, Beer, ..." value={props.description} onChange={props.onDescriptionChanged} />
            <InputLegend>Enter a descriptive name for what was paid.</InputLegend>
          </Section>
          <Section>
            <Caption>How much did it cost?</Caption>
            <Input placeholder="13.37" type="number" value={props.amount} onChange={props.onAmountChanged}/>
            <InputLegend>Enter the total of this bill.</InputLegend>
          </Section>
          <Section>
            <Caption>Who paid?</Caption>
            <Selector>
              <SelectorItem
                leftIcon="person"
                placeholder="Select a Debtee"
                value={props.debtee !== null ? props.debtee + " paid the bill" : null}
                onClick={() => LocationBuilder.fromWindow().push("debtee").apply(push)}
                rightActions={[
                  <FontIcon value="edit" />
                ]} />
            </Selector>
            <InputLegend>Select the person who paid this bill.</InputLegend>
          </Section>

          <Section>
            <Caption>Who is involded?</Caption>
            <Selector>
              <SelectorItem
                leftIcon="group"
                placeholder="Nobody is involved"
                value={selectedDebtors(props.shares).length === 0 ? null : selectedDebtors(props.shares).length + " persons are involved"}
                onClick={() => LocationBuilder.fromWindow().push("debtors").apply(push)}
                rightActions={[
                  <FontIcon value="edit" />
                ]} />
            </Selector>
            <InputLegend>Select who is involved in this bill.</InputLegend>
          </Section>
        </SectionGroup>

        <Button raised primary onClick={handleOnSubmit} label="Add Bill" icon="check_circle" />

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
