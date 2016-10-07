import React from "react";
import { LowerScreenOverlay } from "components/Overlay";
import PersonMoneyList from "components/PersonMoneyList";
import {Avatar} from "components/Avatar";
import Amount from "components/Amount"
import {FormattedDate} from "react-intl";

import styles from "./BillDetailOverlay.scss";
import FontIcon from "react-toolbox/lib/font_icon";

export const BillDetailOverlay = (props) => {

  const onClose = props.onClose || (() => { });
  const active = props.active || false;
  const bill = props.bill;

  const name = bill.name;
  const debtee = bill.debtee;
  const persons = bill.debtors;

  return (
    <LowerScreenOverlay header={name} active={active} onClose={onClose}>
      <PersonMoneyList persons={persons} showKeyword={false}/>
      <div className={styles.debtee}>
        <span className={styles.avatar}><Avatar name={debtee.name} size={30}/></span>
        <span className={styles.name}>{debtee.name} <b>paid</b></span>
        <Amount value={debtee.amount} spanClass={styles.total} />
        <div style={{clear: "both"}}></div>
      </div>
      <div className={styles.added}>
        <FontIcon className={styles.serverIcon} value="cloud_done"/>
        <span className={styles.serverDate}>
          <span>added&nbsp;</span>
          <FormattedDate value={new Date(bill.createdOn)} year='numeric' month='numeric' day='numeric' />
        </span>
        <FontIcon className={styles.addedIcon} value="access_time"/>
        <span className={styles.addedDate}>
          <span>paid&nbsp;</span>
          <FormattedDate value={new Date(bill.date)} year='numeric' month='numeric' day='numeric' />
        </span>
        <div style={{clear: "both"}}></div>
      </div>
    </LowerScreenOverlay>);

};

BillDetailOverlay.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
  bill: React.PropTypes.object.isRequired,
};

export default BillDetailOverlay
