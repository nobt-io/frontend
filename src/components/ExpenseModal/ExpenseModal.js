import React from 'react'
import Modal from 'components/Modal'
import PersonMoneyList from 'components/PersonMoneyList'
import Avatar from 'components/Avatar'
import styles from './ExpenseModal.scss'
import FontIcon from 'react-toolbox/lib/font_icon';

export const ExpenseModal = (props) => {

  const onClose = props.onClose || (() => { });
  const active = props.active || false;
  const expense = props.expense;

  const name = expense.name;
  const debtee = expense.debtee;
  const persons = expense.debtors.map(s => ({amount: s.amount, name: s.name, isPositive: s.isPositive}));

  return (
    <Modal active={active} onClose={onClose}>
      <div className={styles.header}>{name}</div>
      <PersonMoneyList persons={persons} showKeyword={false}></PersonMoneyList>
      <div className={styles.debtee}>
        <span className={styles.avatar}><Avatar name={debtee.name} size={30}/></span>
        <span className={styles.name}>{debtee.name} <b>paid</b></span>
        <span className={styles.total}>{debtee.amount}</span>
        <div style={{clear: "both"}}></div>
      </div>
      <div className={styles.added}>
        <FontIcon className={styles.serverIcon} value="cloud_done"></FontIcon>
        <span className={styles.serverDate}>added 2016-05-06</span>
        <FontIcon className={styles.addedIcon} value="access_time"></FontIcon>
        <span className={styles.addedDate}>paid 2016-05-06</span>
        <div style={{clear: "both"}}></div>
      </div>
    </Modal>);

};

export default ExpenseModal


ExpenseModal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
  expense: React.PropTypes.object.isRequired,
};
