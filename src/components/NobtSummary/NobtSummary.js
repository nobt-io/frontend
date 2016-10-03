import React from 'react'
import ReactFitText from "react-fittext";

import AppBar from 'react-toolbox/lib/app_bar';

import styles from './NobtSummary.scss';

export const NobtSummary = (props) => (
  <div className={styles.container}>
    <ReactFitText maxFontSize={40}>
      <div className={styles.title}>Test</div>
    </ReactFitText>
    <div className={styles.buttonContainer}>
      {props.children}
    </div>
  </div>
);

export default NobtSummary
