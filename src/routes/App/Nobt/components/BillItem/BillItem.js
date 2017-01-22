import React from "react";
import styles from "./BillItem.scss";
import { AvatarList, AvatarSize } from "components/Avatar";
import Amount from "components/Amount";
import { Person, AvatarPosition } from "components/Person";
import { connect } from "react-redux";
import withNavigation from "components/hoc/withNavigation";
import LocationBuilder from "../../modules/navigation/LocationBuilder";

// TODO: Embed link that opens detail page
class BillItem extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render = () => {

    const {bill} = this.props;
    const debtee = bill.debtee;

    return (
      <div onClick={ () => LocationBuilder.fromWindow().push(bill.id).apply(this.props.push) } className={styles.billContainer}>

        <div className={styles.billMetaDataContainer}>
          <div className={styles.nameContainer}>
            <span>{bill.name}</span>
          </div>
          <div className={styles.amountContainer}>
            <Amount value={debtee.amount} />
          </div>
        </div>

        <div className={styles.billPersonInformationContainer}>
          <div className={styles.debtee}>
            <Person name={debtee.name} avatarPosition={AvatarPosition.LEFT} avatarSize={AvatarSize.BIG} />
          </div>
          <div className={styles.debtors}>
            <AvatarList names={bill.debtors.map(debtor => debtor.name)} size={AvatarSize.MEDIUM} />
          </div>
        </div>

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
