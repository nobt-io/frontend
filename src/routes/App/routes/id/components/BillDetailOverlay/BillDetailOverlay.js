import React from "react";
import { FormattedDate } from "react-intl";
import FontIcon from "react-toolbox/lib/font_icon";
import styles from "./BillDetailOverlay.scss";
import Amount from "components/Amount";
import PersonMoneyList from "components/PersonMoneyList";
import { connect } from "react-redux";
import Dialog from "components/Dialog";
import DialogTheme from "components/Dialog/DialogTheme.scss";
import { makeGetBill } from "../../../../modules/currentNobt/selectors";

class BillDetailOverlay extends React.Component {

  render = () => {

    const {bill} = this.props;

    return (
      <Dialog>

        <div className={styles.billDetailOverlay}>

          <h3 className={DialogTheme.header}>{`Shares`}</h3>
          <h4>{bill.name}</h4>

          <PersonMoneyList persons={bill.debtors} />

          <div className={styles.debteeContainer}>

            <span>{bill.debtee.name}&nbsp;paid&nbsp;</span>
            <Amount value={bill.debtee.amount} />

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

const makeMapStateToProps = () => {
  const getBill = makeGetBill();

  return (state, props) => {
    return {
      bill: getBill(state, props)
    }
  }
};

export default connect(
  makeMapStateToProps,
  (dispatch) => ({})
)(BillDetailOverlay)
