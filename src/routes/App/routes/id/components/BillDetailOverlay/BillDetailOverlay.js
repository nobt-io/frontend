import React from "react";
import styles from "./BillDetailOverlay.scss";
import Amount from "components/Amount";
import { connect } from "react-redux";
import Dialog from "components/Dialog";
import DialogTheme from "components/Dialog/DialogTheme.scss";
import { makeGetBill } from "../../../../modules/currentNobt/selectors";
import HOList from "containers/HOList";
import { ListItem, ListDivider, ListSubHeader } from "react-toolbox/lib/list";
import { Avatar } from "components/Avatar";
import ShareListItemTheme from "./ShareListItemTheme.scss";
import ShareListTheme from "./ShareListTheme.scss";
import TotalBillAmountTheme from "./TotalBillAmountTheme.scss";
import DebteeListSubHeaderTheme from "./DebteeListSubHeaderTheme.scss";


class BillDetailOverlay extends React.Component {

  render = () => {

    const {bill} = this.props;
    const {debtee} = bill;

    return (
      <Dialog>

        <div className={styles.billDetailOverlay}>

          <h3 className={DialogTheme.header}>{bill.name}</h3>

          <HOList
            theme={ShareListTheme}
            items={bill.debtors}
            renderItem={ debtor => (
              <ListItem
                theme={ShareListItemTheme}
                ripple={false}
                leftIcon={<Avatar name={debtor.name} medium />}
                key={debtor.name}
                itemContent={
                  <div className={ShareListItemTheme.content}>
                    <span>{debtor.name}</span>
                    <Amount value={debtor.amount}/>
                  </div>
                }
              />
            ) }>
            <ListDivider />
            <ListSubHeader caption={"Paid by"} theme={DebteeListSubHeaderTheme}/>
            <ListItem
              theme={ShareListItemTheme}
              ripple={false}
              leftIcon={<Avatar name={debtee.name} medium />}
              key={debtee.name}
              itemContent={
                <div className={ShareListItemTheme.content}>
                  <span>{debtee.name}</span>
                  <Amount theme={TotalBillAmountTheme} value={debtee.amount}/>
                </div>
              }
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
