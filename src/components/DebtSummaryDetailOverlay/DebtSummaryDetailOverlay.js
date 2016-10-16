import React from "react";
import { LowerScreenOverlay } from "components/Overlay";
import PersonMoneyList from "components/PersonMoneyList";
import Amount from "components/Amount";
import { Person, AvatarPosition, AvatarSize } from "components/Person";
import { FormattedMessage } from "react-intl";
import { Verb, Preposition } from "components/DebtSummaryItem/DebtDirection";
import styles from "./DebtSummaryDetailOverlay.scss";

export const DebtSummaryDetailOverlay = (props) => {

  const onClose = props.onClose || (() => { });
  const active = props.active || false;

  const debtSummary = props.debtSummary;
  const persons = debtSummary.persons;
  const me = debtSummary.me;

  return (
    <LowerScreenOverlay active={active} onClose={onClose}>
      <div>
        <div className={styles.meContainer}>
          <Person name={me.name} avatarPosition={AvatarPosition.LEFT} avatarSize={AvatarSize.BIG} />
        </div>
        <span className={styles.messageContainer}>
          <FormattedMessage
            id="debtSummary.detail.model.debtStatement"
            defaultMessage={ `{verb} {amount} {preposition} {debtorCount, plural,
                                                           one { {singleDebtor} }
                                                           other { {debtorCount} persons }
                                                         }`}
            values={{
              verb: <Verb person={me} />,
              amount: <Amount value={me.amount} spanClass={styles.amountInTextLine} />,
              preposition: <Preposition person={me} />,
              debtorCount: persons.length,
              singleDebtor: <Person name={persons[ 0 ].name}
                                    avatarPosition={AvatarPosition.RIGHT}
                                    avatarSize={AvatarSize.SMALL} />
            }}
          />
        </span>
        {persons.length > 1 && <PersonMoneyList persons={persons} showKeyword={true} />}
      </div>
    </LowerScreenOverlay>
  );
};

DebtSummaryDetailOverlay.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
  debtSummary: React.PropTypes.object.isRequired,
};

export default DebtSummaryDetailOverlay
