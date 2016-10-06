import React from "react";
import styles from "./DatePickerModal.scss";
import { LowerScreenModal } from "components/Modal";
import DatePicker from 'react-toolbox/lib/date_picker';

export const DatePickerModal = (props) => {

  const onYesterdayDateClick = (date) => {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    onDateClick(yesterday);
  };

  const onDateClick = (date) => {
    props.onDateChange(date);
    props.onClose();
  };

  return (
    <LowerScreenModal header={props.title} active={props.active} onClose={props.onClose}>
      <div className={styles.container}>
        <span onClick={() => onDateClick(new Date())} className={styles.button}>Today</span>
        <span onClick={() => onYesterdayDateClick()} className={styles.button}>Yesterday</span>
        <DatePicker theme={{input: styles.datePicker}} label='Other Date?' onChange={(d) => onDateClick(d)}/>
        <div style={{clear: "both"}}></div>
      </div>
    </LowerScreenModal>
  );
};

DatePickerModal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  onDateChange: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
};


export default DatePickerModal
