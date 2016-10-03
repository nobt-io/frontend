import React from "react";
import styles from "./NobtSummary.scss";

export const NobtSummary = (props) => {

  var membersCount = (props.members || []).length;

  var nobtDetails = (props.total != 0)
                      ? (<div className={styles.nobtSummary}>{props.total} € | {membersCount} Members </div>)
                      : "";

  return(
    <div className={styles.container}>
      <h1 className={styles.nobtName}>{props.nobtName}</h1>
      {nobtDetails}
    </div>
  );
};

export default NobtSummary
