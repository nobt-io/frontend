import React from 'react'
import DatePicker from 'react-toolbox/lib/date_picker';

import styles from './QuickDatePicker.scss'

let yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date());

export const QuickDatePicker = (props) => {

  return (
    <div className={styles.container}>
      <span onClick={() => props.onDatePicked(new Date())} className={styles.button}>Today</span>
      <span onClick={() => props.onDatePicked(yesterday)} className={styles.button}>Yesterday</span>
      <DatePicker theme={{input: styles.datePicker}} label='Other Date?' onChange={(pickedDate) => props.onDatePicked(pickedDate)}/>
      <div style={{clear: "both"}}></div>
    </div>
  )
};

export default QuickDatePicker


QuickDatePicker.propTypes = {
  onDatePicked: React.PropTypes.func.isRequired,
};
