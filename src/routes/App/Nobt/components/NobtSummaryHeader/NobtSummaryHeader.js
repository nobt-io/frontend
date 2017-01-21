import React from "react";
import styles from "./NobtSummaryHeader.scss";
import Amount from "components/Amount"

export const NobtSummaryHeader = (props) => {

   var nobtDetails = (props.isNobtEmpty)
    ? ""
    : (<div className={styles.nobtSummary}>{<Amount value={props.totalAmount}/>} | {props.memberCount} Members </div>);

  return (
    <div className={styles.container}>
      <h1 className={styles.nobtName}>{props.nobtName}</h1>
      {nobtDetails}
    </div>
  );
};

NobtSummaryHeader.propTypes = {
  nobtName: React.PropTypes.string.isRequired,
  totalAmount: React.PropTypes.number.isRequired,
  memberCount: React.PropTypes.number.isRequired,
  isNobtEmpty: React.PropTypes.bool.isRequired
};

export default NobtSummaryHeader
