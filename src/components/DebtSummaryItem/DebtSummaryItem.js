import React from "react";
import styles from "./DebtSummaryItem.scss";
import Avatar from "components/Avatar";
import Amount from "components/Amount"

import DebtSummaryDetailModel from "components/DebtSummaryDetailModel";
import Card from "components/Card";
import FontIcon from "react-toolbox/lib/font_icon";

const isPositive = (personAmount) => personAmount.amount > 0;

export const DebtSummaryItem = React.createClass({

  onModalClose: function () {
    this.setState({modalIsActive: false});
  },

  onModalOpen: function () {
    this.setState({modalIsActive: true});
  },

  render: function () {

    const {modalIsActive} = this.state || {modalIsActive: false};
    const {summary} = this.props;

    const me = summary.me;

    const persons = summary.persons.map(p => (
        <span key={p.name} className={styles.personAvatar}><Avatar name={p.name} size={20} fontSize={11}/></span>));

    const meKeyword = isPositive(me) ? "gets" : "owes";
    const personsKeyword = isPositive(me) ? "from" : "to";
    const icon = isPositive(me) ? "add_circle" : "remove_circle";

    return (
      <Card>
        <DebtSummaryDetailModel active={modalIsActive} onClose={this.onModalClose} debtSummary={summary}/>

        <div onClick={this.onModalOpen} className={styles.container}>
          <div className={styles.avatar}>
            <Avatar name={me.name} size={45}/>
            <span className={styles.icon}><FontIcon value={icon}/></span>
          </div>
          <div className={styles.meContainer}>
            <span className={styles.me}>{me.name}</span>
            <span className={styles.transparent} />
          </div>
          <div className={styles.amountInfo}>
            <div className={styles.amount}>
              <Amount value={me.amount} theme={ {span: styles.total} }/>
              <span className={styles.keyword}>{meKeyword}</span>
              <div style={{clear: "both"}}></div>
            </div>
            <div className={styles.persons}>{personsKeyword}{persons}</div>
          </div>
        </div>
      </Card>);
  },
});

var personAmountPropType = React.PropTypes.shape({
  name: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired
}).isRequired;

DebtSummaryItem.propTypes = {
  summary: React.PropTypes.shape({
    me: personAmountPropType,
    persons: React.PropTypes.arrayOf(personAmountPropType),
  }).isRequired
};

export default DebtSummaryItem
