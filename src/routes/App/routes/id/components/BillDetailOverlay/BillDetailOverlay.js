import React from "react";
import styles from "./BillDetailOverlay.scss";
import Amount from "components/Amount";
import { connect } from "react-redux";
import Dialog from "components/Dialog";
import DialogTheme from "components/Dialog/DialogTheme.scss";
import { makeGetBill } from "../../../../modules/currentNobt/selectors";
import HOList from "containers/HOList";
import { ListDivider, ListItem, ListSubHeader } from "react-toolbox/lib/list";
import { Avatar } from "components/Avatar";
import TotalBillAmountTheme from "./TotalBillAmountTheme.scss";

class BillDetailOverlay extends React.Component {

  render = () => {

    const {bill} = this.props;
    const {debtee} = bill;

    return (
      <Dialog>

        <div className={styles.billDetailOverlay}>

          <h3 className={DialogTheme.header}>{bill.name}</h3>

          <HOList
            items={bill.debtors}
            renderItem={ debtor => (
              <ListItem
                ripple={false}
                leftActions={[
                  <Avatar name={debtor.name} medium />
                ]}
                key={debtor.name}
                caption={debtor.name}
                rightActions={[
                  <Amount value={debtor.amount}/>
                ]}
              />
            ) }>
            <ListDivider />
            <ListSubHeader caption={"Paid by"} />
            <ListItem
              ripple={false}
              leftActions={[
                <Avatar name={debtee.name} medium />
              ]}
              key={debtee.name}
              caption={debtee.name}
              rightActions={[
                <Amount theme={TotalBillAmountTheme} value={debtee.amount}/>
              ]}
            />
          </HOList>
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
