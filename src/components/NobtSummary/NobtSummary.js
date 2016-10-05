import React from "react";
import styles from "./NobtSummary.scss";
import Amount from "components/Amount"

export const NobtSummary = (props) => {

   var nobtDetails = (props.isNobtEmpty)
    ? ""
    : (<div className={styles.nobtSummary}>{<Amount value={props.totalAmount.amount}/>} | {props.memberCount} Members </div>);

  return (
    <div className={styles.container}>
      <h1 className={styles.nobtName}>{props.nobtName}</h1>
      {nobtDetails}
    </div>
  );
};

NobtSummary.propTypes = {
  nobtName: React.PropTypes.string.isRequired,
  totalAmount: React.PropTypes.number.isRequired,
  memberCount: React.PropTypes.number.isRequired,
  isNobtEmpty: React.PropTypes.bool.isRequired
};

export default NobtSummary
