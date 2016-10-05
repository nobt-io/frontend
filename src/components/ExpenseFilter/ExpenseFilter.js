import React from 'react'
import styles from './ExpenseFilter.scss'
import FontIcon from 'react-toolbox/lib/font_icon';

import Card from 'components/Card'

export const ExpenseFilter = (props) => (
    <div className={styles.container}>
      <span className={styles.filterIcon}><FontIcon value='filter_list' /></span>
      <span className={styles.filter}>show <b>{props.filter}</b></span>
      <span className={styles.filter}>sort by <b>{props.sort}</b></span>
    </div>
)

export default ExpenseFilter
