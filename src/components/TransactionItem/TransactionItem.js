import React from "react";
import styles from "./TransactionItem.scss";
import Avatar from "components/Avatar";
import TransactionModal from "components/TransactionModal";
import Card from "components/Card";
import FontIcon from "react-toolbox/lib/font_icon";


export const TransactionItem = React.createClass({

  onModalClose: function () {
    this.setState({modalIsActive: false});
  },

  onModalOpen: function () {
    this.setState({modalIsActive: true});
  },

  render: function () {

    const {modalIsActive} = this.state || {modalIsActive: false};
    const {transaction} = this.props;

    const me = transaction.me;
    const persons =
      transaction.persons.map(s => (
        <span className={styles.personAvatar}><Avatar name={s.name} size={20} fontSize={11}/></span>));

    const meKeyword = me.isPositive ? "gets" : "owes";
    const personsKeyword = me.isPositive ? "from" : "to";
    const icon = me.isPositive ? "add_circle" : "remove_circle";

    return (
      <Card>
        <TransactionModal active={modalIsActive} onClose={this.onModalClose} transaction={transaction}/>
        <div onClick={this.onModalOpen} className={styles.container}>
          <div className={styles.avatar}>
            <Avatar name={me.name} size={45}/>
            <span className={styles.icon}><FontIcon value={icon}/></span>
          </div>
          <div className={styles.meContainer}>
            <span className={styles.me}>{me.name}</span>
            <span className={styles.transparent}></span>
          </div>
          <div className={styles.amountInfo}>
            <div className={styles.amount}>
              <span className={styles.total}>{me.amount}</span>
              <span className={styles.keyword}>{meKeyword}</span>
              <div style={{clear: "both"}}></div>
            </div>
            <div className={styles.persons}>{personsKeyword}{persons}</div>
          </div>
        </div>
      </Card>);
  }

  // TODO: need to define prop types
});


export default TransactionItem
