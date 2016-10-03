import React from 'react'
import ReactFitText from "react-fittext";

import AppBar from 'react-toolbox/lib/app_bar';

import styles from './NobtSummary.scss';

export const NobtSummary = (props) => {

  var nobtDetails = (props.total != 0)
                      ? (<div className={styles.nobtSummary}>{props.total} € | {props.member.length} Members </div>)
                      : "";

  return(
    <div className={styles.container}>
      <h1 className={styles.nobtName}>{props.nobtName}</h1>
      {nobtDetails}
    </div>
  );
};

export default NobtSummary
