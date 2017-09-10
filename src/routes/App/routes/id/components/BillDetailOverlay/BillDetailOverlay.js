import React from "react";
import Amount from "components/Amount";
import HeadRoom from "react-headroom";
import { connect } from "react-redux";
import { makeGetBill } from "../../../../modules/currentNobt/selectors";
import HOList from "containers/HOList";
import { ListItem } from "react-toolbox/lib/list";
import { Avatar } from "components/Avatar";
import { AppBar } from "react-toolbox/lib/app_bar/index";
import AppBarTheme from "../../../balances/themes/AppBarTheme.scss";
import { FontIcon } from "react-toolbox/lib/font_icon/index";
import { SubTitle, Title } from "../../../../../../components/text/index";
import LocationBuilder from "../../../../modules/navigation/LocationBuilder";
import { List } from "react-toolbox/lib/list/index";
import TotalBillAmountTheme from "./TotalBillAmountTheme.scss"

class BillDetailPage extends React.Component {

  render = () => {

    const {bill} = this.props;
    const {debtee} = bill;

    return (

      <div>

        <HeadRoom>
          <AppBar
            theme={AppBarTheme}
            onLeftIconClick={() => LocationBuilder.fromWindow().pop(1).apply(this.props.replace)}
            leftIcon={<FontIcon value="chevron_left" />}
            rightIcon={<FontIcon />}
            title={bill.name}
          />
        </HeadRoom>

        <div>
          <Title>Summary</Title>

          <Title>Debtors</Title>
          <SubTitle>These people participate in this bill.</SubTitle>
          <HOList
            items={bill.debtors}
            renderItem={debtor => (
              <ListItem
                ripple={false}
                leftActions={[
                  <Avatar name={debtor.name} medium />
                ]}
                key={debtor.name}
                caption={debtor.name}
                rightActions={[
                  <Amount value={debtor.amount} />
                ]}
              />
            )} />

          <Title>Debtee</Title>
          <SubTitle>This person paid the bill.</SubTitle>
          <List>
            <ListItem
              ripple={false}
              leftActions={[
                <Avatar name={debtee.name} medium />
              ]}
              key={debtee.name}
              caption={debtee.name}
              rightActions={[
                <Amount theme={TotalBillAmountTheme} value={debtee.amount} />
              ]}
            />
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
