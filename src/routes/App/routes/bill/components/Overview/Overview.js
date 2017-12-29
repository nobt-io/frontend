import React from "react";
import HeadRoom from "react-headroom";
import { FontIcon } from "react-toolbox/lib/font_icon/index";
import { SubTitle, Title } from "components/text/index";
import { Main } from "components/Container";
import { Input } from "react-toolbox/lib/input/index";
import Box from "../../../../../../components/Box/Box";
import LocationBuilder from "../../../../modules/navigation/LocationBuilder";
import withNavigation from "../../../../../../components/hoc/withNavigation";
import connect from "react-redux/es/connect/connect";
import { getAmount, getDebtee, getDescription, getShares } from "../../modules/addBillForm/selectors";
import Button from "../../../../../../components/Button/Button";
import { addBill } from "../../modules/addBillForm/actions";
import { Selector, SelectorItem } from "components/Selector";

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
        <Title>Subject</Title>
        <SubTitle>Enter a descriptive name for what was paid.</SubTitle>
        <Box>
          <Input placeholder="Trip Snacks, Train Tickets, Beer, ..." value={props.description} onChange={props.onDescriptionChanged} />
        </Box>

        <Title>Total</Title>
        <SubTitle>Enter the total of this bill.</SubTitle>
        <Box>
          <Input placeholder="13.37" type="number" value={props.amount} onChange={props.onAmountChanged} />
        </Box>

        <Title>Debtee</Title>
        <SubTitle>Select the person who paid this bill.</SubTitle>
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

        <Title>Debtors</Title>
        <SubTitle>Select who is involved in this bill.</SubTitle>
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
