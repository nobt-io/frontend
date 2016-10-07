import React from "react";
import styles from "./DebtSummaryItem.scss";
import { SmallAvatar } from "components/Avatar";
import { Person, AvatarPosition, AvatarSize } from "components/Person";
import Amount from "components/Amount";
import DebtSummaryDetailOverlay from "components/DebtSummaryDetailOverlay";
import Card from "components/Card";
import FontIcon from "react-toolbox/lib/font_icon";

const isPositive = (personAmount) => personAmount.amount > 0;

export const DebtSummaryItem = React.createClass({

  hideModalDialog: function () {
    this.setState({showDetailModalDialog: false});
  },

  showModalDialog: function () {
    this.setState({showDetailModalDialog: true});
  },

  getInitialState: function () {
    return {
      showDetailModalDialog: false
    };
  },

  render: function () {
    const {summary} = this.props;

    const me = summary.me;
    const persons = summary.persons.map(p => (<span key={p.name} className={styles.avatar}><SmallAvatar name={p.name} /></span>));
    const icon = isPositive(me) ? "add_circle" : "remove_circle";

    return (
      <Card>
        <DebtSummaryDetailOverlay active={this.state.showDetailModalDialog} onClose={this.hideModalDialog} debtSummary={summary} />

        <div onClick={this.showModalDialog} className={styles.container}>
          <span className={styles.meContainer}>
            <Person
              avatarClass={styles.meAvatar}
              avatarSize={AvatarSize.BIG}
              avatarPosition={AvatarPosition.LEFT}
              name={me.name}>
              <FontIcon className={styles.meAvatarIcon} value={icon} />
            </Person>
          </span>

          <div className={styles.debtSummaryContainer}>

            <div className={styles.amountContainer}>
              <span className={styles.verb}>{isPositive(me) ? "gets" : "owes"}</span>
              <Amount spanClass={styles.amount} value={me.amount} />
            </div>

            <div className={styles.personsContainer}>

              <span className={styles.verb}>{isPositive(me) ? "from" : "to"}</span>
              <span className={styles.persons}>{persons}</span>
            </div>
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

export default DebtSummaryItem;
