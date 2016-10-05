import React from "react";
import {LowerScreenModal} from "components/Modal";
import PersonMoneyList from "components/PersonMoneyList";
import Avatar from "components/Avatar";
import styles from "./DebtSummaryDetailModel.scss";

export const DebtSummaryDetailModel = (props) => {


  const onClose = props.onClose || (() => {
    });
  const active = props.active || false;
  const transaction = props.debtSummary;

  const me = transaction.me;
  const persons = transaction.persons;

  const isSinglePerson = persons.length == 1;

  if (isSinglePerson) {
    const firstPerson = !me.isPositive ? me.name : persons[0].name;
    const secondPerson = me.isPositive ? me.name : persons[0].name;

    return (
      <LowerScreenModal active={active} onClose={onClose}>
        <div className={styles.singleLine}>
          <div>
            <span className={styles.avatar}><Avatar name={firstPerson} size={30}/></span>
            <span className={styles.name}>{firstPerson}</span>
            <div style={{clear: "both"}}></div>
          </div>
          <div className={styles.total}>
            <span className={styles.name}><b>owes {me.amount} to</b></span>
          </div>
          <div>
            <div style={{clear: "both"}}></div>
            <span className={styles.name}>{secondPerson}</span>
            <span className={styles.avatar}><Avatar name={secondPerson} size={30}/></span>
            <div style={{clear: "both"}}></div>
          </div>
        </div>
      </LowerScreenModal>
    );
  }
  else {
    const keyword = me.isPositive ? "get" : "owe";
    const directionKeyword = me.isPositive ? "from" : "to";
    return (
      <LowerScreenModal active={active} onClose={onClose}>
        <div className={styles.header}>
          <span className={styles.avatar}><Avatar name={me.name} size={40}/></span>
          <span className={styles.name}>{me.name}</span>
          <div style={{clear: "both"}}></div>
        </div>
        <div className={styles.me}>
          you <b>{keyword} {me.amount}</b> {directionKeyword}&nbsp;<b>{persons.length} persons</b>
        </div>
        <PersonMoneyList persons={persons} showKeyword={true}></PersonMoneyList>
      </LowerScreenModal>);
  }


};

DebtSummaryDetailModel.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
  debtSummary: React.PropTypes.object.isRequired,
};

export default DebtSummaryDetailModel
