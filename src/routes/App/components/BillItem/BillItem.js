import React from "react";
import { connect } from "react-redux";
import withNavigation from "../../../../components/hoc/withNavigation";
import { Card, CardTitle, CardText } from "react-toolbox/lib/card";
import { FormattedMessage } from "react-intl";
import LocationBuilder from "../../modules/navigation/LocationBuilder";
import BillCardTitleTheme from "./BillCardTitleTheme.scss";
import OverflowMenuTheme from "./OverflowMenuTheme.scss";
import styles from "./BillItem.scss";
import Amount from "components/Amount";
import { IconMenu, MenuItem } from "react-toolbox/lib/menu";

class BillItem extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render = () => {

    const {bill} = this.props;
    const debtee = bill.debtee;

    return (
      <div className={styles.billItemContainer}>
        <Card onClick={ () => LocationBuilder.fromWindow().push(bill.id).apply(this.props.push) }>
          <CardTitle
            theme={BillCardTitleTheme}
            title={bill.name}
            subtitle={<FormattedMessage
              id="BillItem.subtitle"
              defaultMessage="{amount} paid by {debtee}"
              values={{
                amount: <Amount value={bill.debtee.amount} />,
                debtee: bill.debtee.name
              }} />}>
          </CardTitle>
          <CardText>
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
                first: bill.debtors[ 0 ].name,
                second: bill.debtors[ 1 ].name,
                third: bill.debtors[ 2 ].name,
                remaining: bill.debtors.length - 2
              }} />
          </CardText>
        </Card>

        <IconMenu theme={OverflowMenuTheme}>
          <MenuItem icon="delete" caption="Delete bill" disabled/>
        </IconMenu>
      </div>
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
