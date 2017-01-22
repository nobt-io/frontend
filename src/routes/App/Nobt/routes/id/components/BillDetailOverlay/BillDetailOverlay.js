import React from "react";
import { FormattedDate } from "react-intl";
import FontIcon from "react-toolbox/lib/font_icon";
import { ListDivider } from "react-toolbox/lib/list";
import styles from "./BillDetailOverlay.scss";
import Header from "components/Header";
import CloseButton from "components/CloseButton";
import Amount from "components/Amount";
import PersonMoneyList from "components/PersonMoneyList";
import { connect } from "react-redux";
import { Dialog } from "react-toolbox/lib/dialog";

// TODO: connect and retrieve bill from store
class BillDetailOverlay extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render = () => {

    const {bill} = this.props;
    const debtee = bill.debtee;

    return (
      <Dialog active={true} onOverlayClick={this.props.goBack}>
        <div className={styles.billDetailOverlay}>

          <Header
            left={<h3>{`Shares for ${bill.name}`}</h3>}
            right={<CloseButton onClick={this._overlay.hide} />}
          />

          <ListDivider />

          <PersonMoneyList persons={bill.debtors} />

          <div className={styles.debteeContainer}>

            <span>{debtee.name}&nbsp;paid&nbsp;</span>
            <Amount value={debtee.amount} />

          </div>


          <div className={styles.billDetailMetaDataContainer}>

            <div className={styles.addedOnTimestamp}>

              <FontIcon value="cloud_done" />
              <span>&nbsp;created&nbsp;on&nbsp;</span>
              <FormattedDate value={new Date(bill.createdOn)} year='numeric' month='numeric' day='numeric' />

            </div>

            <div className={styles.paidOnTimestamp}>

              <FontIcon value="access_time" />
              <span>&nbsp;paid&nbsp;on&nbsp;</span>
              <FormattedDate value={new Date(bill.date)} year='numeric' month='numeric' day='numeric' />

            </div>

          </div>
        </div>
      </Dialog>
    );
  }
}

BillDetailOverlay.propTypes = {
  bill: React.PropTypes.object.isRequired
};

let mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
};

export default connect(() => ({}), mapDispatchToProps)(BillDetailOverlay)
