import React from "react";
import { FormattedMessage } from "react-intl";
import { ListDivider } from "react-toolbox/lib/list"

import styles from "./DebtSummaryItem.scss";
import Header from "components/Header";
import CloseButton from "components/CloseButton";
import PersonMoneyList from "components/PersonMoneyList";
import { AvatarList, AvatarSize } from "components/Avatar";
import { Person, AvatarPosition } from "components/Person";
import Amount from "components/Amount";
import Card from "components/Card";
import { Verb, Preposition, Icon } from "./DebtDirection";
import Visibility from "const/Visibility";
import Overlay from "components/Overlay";

export const DebtSummaryItem = React.createClass({

  closeDebtSummaryDetailOverlay() {
    this.setState({detailOverlayVisibility: Visibility.HIDDEN});
  },

  openDebtSummaryDetailOverlay() {
    this.setState({detailOverlayVisibility: Visibility.VISIBLE});
  },

  getInitialState() {
    return {
      detailOverlayVisibility: Visibility.HIDDEN
    };
  },

  render() {
    const {summary} = this.props;

    const me = summary.me;

    return (
      <Card>
        <Overlay visibility={this.state.detailOverlayVisibility} onClickOutside={this.closeDebtSummaryDetailOverlay}>
          <div className={styles.balanceDetailOverlay}>
            <Header
              left={<h3>Balance</h3>}
              right={<CloseButton onClick={this.closeDebtSummaryDetailOverlay} />}
            />

            <div className={styles.messageContainer}>
              <FormattedMessage
                id="debtSummary.detail.model.debtStatement"
                defaultMessage={ `{debtor} {verb} {amount} {preposition} {debtorCount, plural,
                                                           one { {singleDebtor}. }
                                                           other { {debtorCount} persons. }
                                                         }`}
                values={{
                  debtor: me.name,
                  verb: <Verb person={me} />,
                  amount: <Amount value={me.amount} spanClass={styles.amountInTextLine} />,
                  preposition: <Preposition person={me} />,
                  debtorCount: summary.persons.length,
                  singleDebtor: summary.persons[ 0 ].name
                }}
              />
            </div>


            <ListDivider />

            <div>
              {summary.persons.length > 1 && <PersonMoneyList persons={summary.persons} showKeyword={true} />}
            </div>
          </div>
        </Overlay>

        <div onClick={this.openDebtSummaryDetailOverlay} className={styles.container}>
          <span className={styles.meContainer}>
            <Person
              avatarClass={styles.meAvatar}
              avatarSize={AvatarSize.BIG}
              avatarPosition={AvatarPosition.LEFT}
              name={me.name}>
              <Icon className={styles.meAvatarIcon} person={me} />
            </Person>
          </span>

          <div className={styles.debtSummaryContainer}>

            <div className={styles.amountContainer}>
              <Verb className={styles.verb} person={me} />
              <Amount spanClass={styles.amount} value={me.amount} />
            </div>

            <div className={styles.personsContainer}>
              <Preposition className={styles.preposition} person={me} />
              <span className={styles.persons}>
                <AvatarList names={summary.persons.map(p => p.name)} size={AvatarSize.SMALL} />
              </span>
            </div>

          </div>
        </div>
      </Card>);
  },
});

var person = React.PropTypes.shape({
  name: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired
}).isRequired;

DebtSummaryItem.propTypes = {
  summary: React.PropTypes.shape({
    me: person,
    persons: React.PropTypes.arrayOf(person),
  }).isRequired
};

export default DebtSummaryItem;
