import React from "react";
import styles from "./ExpenseItem.scss";
import Card from "components/Card";
import {Avatar} from "components/Avatar";
import Amount from "components/Amount"
import ExpenseModal from "components/ExpenseModal";
import {FormattedDate} from "react-intl";

export const ExpenseItem = React.createClass({

  onModalClose: function () {
    this.setState({modalIsActive: false});
  },

  onModalOpen: function () {
    this.setState({modalIsActive: true});
  },

  render: function () {

    const {modalIsActive} = this.state || {modalIsActive: false};
    const {expense} = this.props;

    const debtee = expense.debtee;
    const debtorsAvatars = expense.debtors.map(debtor => (<span key={debtor.name} className={styles.avatar}><Avatar name={debtor.name} size={20} fontSize={11}/></span>));

    return (
      <Card>
        <ExpenseModal active={modalIsActive} onClose={this.onModalClose} expense={expense}/>
        <div onClick={this.onModalOpen} className={styles.container}>
          <div className={styles.title}>
            <div className={styles.description}>
              <Amount value={debtee.amount} spanClass={styles.amount} />
              <span className={styles.name}>{expense.name}</span>
            </div>
            <div className={styles.date}>
              <FormattedDate value={new Date(expense.date)} year='numeric' month='short' day='numeric' weekday='short' />
            </div>
            <div style={{clear: "both"}}></div>
          </div>
          <div className={styles.persons}>
            <div className={styles.right}>{debtorsAvatars}</div>
            <div className={styles.left}>
              <span className={styles.avatar}><Avatar name={debtee.name} size={30}/></span>
              <span className={styles.name}><b>{debtee.name}</b> paid</span>
              <span className={styles.transition} />
            </div>
          </div>
        </div>
      </Card>
    );
  },
});

ExpenseItem.propTypes = {
  expense: React.PropTypes.object.isRequired
}

export default ExpenseItem
