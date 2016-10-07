import React from "react";
import styles from "./BillItem.scss";
import Card from "components/Card";
import { Avatar } from "components/Avatar";
import Amount from "components/Amount";
import BillDetailOverlay from "components/BillDetailOverlay";

export const BillItem = React.createClass({

  onModalClose: function () {
    this.setState({modalIsActive: false});
  },

  onModalOpen: function () {
    this.setState({modalIsActive: true});
  },

  render: function () {

    const {modalIsActive} = this.state || {modalIsActive: false};
    const {bill} = this.props;

    const debtee = bill.debtee;
    const debtorsAvatars = bill.debtors.map(debtor => (
      <span key={debtor.name} className={styles.avatar}><Avatar name={debtor.name} size={20} fontSize={11} /></span>));

    return (
      <Card>
        <BillDetailOverlay active={modalIsActive} onClose={this.onModalClose} bill={bill} />
        <div onClick={this.onModalOpen} className={styles.container}>
          <div className={styles.title}>
            <div className={styles.description}>
              <Amount value={debtee.amount} spanClass={styles.amount} />
              <span className={styles.name}>{bill.name}</span>
            </div>
            <div style={{clear: "both"}}></div>
          </div>
          <div className={styles.persons}>
            <div className={styles.right}>{debtorsAvatars}</div>
            <div className={styles.left}>
              <span className={styles.avatar}><Avatar name={debtee.name} size={30} /></span>
              <span className={styles.name}><b>{debtee.name}</b> paid</span>
              <span className={styles.transition} />
            </div>
          </div>
        </div>
      </Card>
    );
  },
});

BillItem.propTypes = {
  bill: React.PropTypes.object.isRequired
}

export default BillItem
