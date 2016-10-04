import React from 'react'
import Modal from 'components/Modal'
import PersonMoneyList from 'components/PersonMoneyList'
import Avatar from 'components/Avatar'
import styles from './TransactionModal.scss'
import FontIcon from 'react-toolbox/lib/font_icon';

export const TransactionModal = (props) => {


  const onClose = props.onClose || (() => {
    });
  const active = props.active || false;
  const transaction = props.transaction;

  const total = transaction.total;
  const absTotal = Math.abs(total);
  const name = transaction.me;
  const persons = props.transaction.summaries;

  const isSinglePerson = persons.length == 1;

  if (isSinglePerson) {
    const firstPerson = total < 0 ? name : persons[0].name;
    const secondPerson = total > 0 ? name : persons[0].name;

    return (
      <Modal active={active} onClose={onClose}>
        <div className={styles.singleLine}>
          <div>
            <span className={styles.avatar}><Avatar name={firstPerson} size={30}/></span>
            <span className={styles.name}>{firstPerson}</span>
            <div style={{clear: "both"}}></div>
          </div>
          <div className={styles.total}>
            <span className={styles.name}><b>owes {absTotal},00 € to</b></span>
          </div>
          <div>
            <div style={{clear: "both"}}></div>
            <span className={styles.name}>{secondPerson}</span>
            <span className={styles.avatar}><Avatar name={secondPerson} size={30}/></span>
            <div style={{clear: "both"}}></div>
          </div>
        </div>
      </Modal>
    );
  }
  else {
    const keyword = total > 0 ? "get" : "owe";
    const directionKeyword = total > 0 ? "from" : "to";
    return (
      <Modal active={active} onClose={onClose}>
        <div className={styles.header}>
          <span className={styles.avatar}><Avatar name={name} size={40}/></span>
          <span className={styles.name}>{name}</span>
          <div style={{clear: "both"}}></div>
        </div>
        <div className={styles.me}>
          you <b>{keyword} {absTotal} €</b> {directionKeyword}&nbsp;<b>{persons.length} persons</b>
        </div>
        <PersonMoneyList persons={persons} showKeyword={true}></PersonMoneyList>
      </Modal>);
  }


};

export default TransactionModal


TransactionModal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
  transaction: React.PropTypes.object.isRequired,
};
