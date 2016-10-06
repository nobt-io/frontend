import React from 'react'
import styles from './TopInfo.scss'

export const TopInfo = (props) => (
  <div className={styles.container}>
    <div className={styles.message}>{props.children}</div>
  </div>
);

export default TopInfo
