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
import { makeGetBill } from "../../../../modules/currentNobt/selectors";
import { ProgressBar } from "react-toolbox/lib/progress_bar";

// TODO: connect and retrieve bill from store
class BillDetailOverlay extends React.Component {

  render = () => {

    const {bill} = this.props;
    return (
      <Dialog active={true} onOverlayClick={this.props.goBack}>

        { !bill && (
          <ProgressBar type='circular' mode='indeterminate' multicolor />
        ) }

        { bill && (
          <div className={styles.billDetailOverlay}>

            <Header
              left={<h3>{`Shares for ${bill.name}`}</h3>}
              right={<CloseButton onClick={this.props.goBack} />}
            />

            <ListDivider />

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
        )}
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
