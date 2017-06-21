import React from "react";
import { connect } from "react-redux";
import withNavigation from "../../../../components/hoc/withNavigation";
import { Card, CardText, CardTitle } from "react-toolbox/lib/card";
import { FormattedMessage, FormattedRelative } from "react-intl";
import LocationBuilder from "../../modules/navigation/LocationBuilder";
import BillCardTitleTheme from "./BillCardTitleTheme.scss";
import BillCardTextTheme from "./BillCardTextTheme.scss";
import Amount from "components/Amount";
import CardTheme from "./CardTheme.scss";

class BillItem extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  getDebtorName = (index) => (this.props.bill.debtors[ index ] || {}).name;

  render = () => {

    const {bill} = this.props;
    const debtee = bill.debtee;

    return (
      <Card onClick={ () => LocationBuilder.fromWindow().push(bill.id).apply(this.props.push)} theme={CardTheme}>
        <CardTitle
          theme={BillCardTitleTheme}
          title={bill.name}
          subtitle={<FormattedMessage
            id="BillItem.subtitle"
            defaultMessage="{amount} &#8226; {timestamp}"
            values={{
              amount: <Amount value={bill.debtee.amount} />,
              timestamp: <FormattedRelative value={new Date(bill.createdOn)} updateInterval={30000} initialNow={new Date(Date.now())} />
            }} />}>
        </CardTitle>
        <CardText theme={BillCardTextTheme}>
          <FormattedMessage
            id="BillItem.involvedPeople"
            defaultMessage="{numberOfPeople, plural,
                  =1 {{first}}
                  =2 {{first} and {second}}
                  =3 {{first}, {second} and {third}}
                  other {{first}, {second} and {remaining} others}
              }."
            values={{
              numberOfPeople: bill.debtors.length,
              first: this.getDebtorName(0),
              second: this.getDebtorName(1),
              third: this.getDebtorName(2),
              remaining: bill.debtors.length - 2
            }} />
        </CardText>
      </Card>
    );
  }
}

BillItem.propTypes = {
  bill: React.PropTypes.object.isRequired
};

export default connect(
  (state) => ({}),
  (dispatch) => ({})
)(withNavigation(BillItem))
