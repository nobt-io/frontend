import React from 'react'

import { Avatar, AvatarSize } from "components/Avatar"

import styles from './DebteePicker.scss'

export const DebteePicker = (props) => (
  <div className={`${props.className} ${styles.DebteePicker}`}>
    <div className={styles.avatar}>
      <Avatar name={props.name} size={AvatarSize.BIG}/>
    </div>

    <div className={styles.debteeContainer}>
      <div className={styles.label}>paid by</div>
      <div className={styles.debtee}>{props.name}</div>
    </div>
  </div>
)

export default DebteePicker
