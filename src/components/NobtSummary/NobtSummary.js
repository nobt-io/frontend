import React from "react";
import styles from "./NobtSummary.scss";

export const NobtSummary = (props) => {

   var nobtDetails = (props.nobtIsEmpty)
    ? ""
    : (<div className={styles.nobtSummary}>{props.totalAmount} | {props.memberCount} Members </div>);

  return (
    <div className={styles.container}>
      <h1 className={styles.nobtName}>{props.nobtName}</h1>
      {nobtDetails}
    </div>
  );
};

NobtSummary.propTypes = {
  nobtName: React.PropTypes.string.isRequired,
  totalAmount: React.PropTypes.string.isRequired,
  memberCount: React.PropTypes.number.isRequired,
  nobtIsEmpty: React.PropTypes.bool.isRequired
};

export default NobtSummary
