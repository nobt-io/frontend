import React from "react";
import { LowerScreenModal } from "components/Modal";
import PersonMoneyList from "components/PersonMoneyList";
import Amount from "components/Amount";
import { Person, AvatarPositions, AvatarSize } from "components/Person";
import { FormattedMessage } from "react-intl";
import styles from "./DebtSummaryDetailModal.scss";

export const DebtSummaryDetailModal = (props) => {

  const onClose = props.onClose || (() => { });
  const active = props.active || false;

  const debtSummary = props.debtSummary;
  const persons = debtSummary.persons;
  const me = debtSummary.me;

  return (
    <LowerScreenModal active={active} onClose={onClose}>
      <div>
        <div className={styles.meContainer}>
          <Person name={me.name} avatarPosition={AvatarPositions.LEFT} avatarSize={AvatarSize.BIG} />
        </div>
        <span className={styles.messageContainer}>
          <FormattedMessage
            id="debtSummary.detail.model.debtStatement"
            defaultMessage={ `{verb} {amount} {preposition} {debtorCount, plural,
                                                           one { {singleDebtee} }
                                                           other { {debtorCount} persons }
                                                         }`}
            values={{
              verb: me.amount > 0 ? 'gets' : 'owes',
              preposition: me.amount > 0 ? 'from' : 'to',
              amount: <Amount value={me.amount} spanClass={styles.amountInTextLine} />,
              debtorCount: persons.length,
              singleDebtee: <Person name={persons[ 0 ].name} avatarPosition={AvatarPositions.RIGHT}
                                    avatarSize={AvatarSize.SMALL} />
            }}
          />
        </span>
        {persons.length > 1 && <PersonMoneyList persons={persons} showKeyword={true} />}
      </div>
    </LowerScreenModal>
  );
};

DebtSummaryDetailModal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
  debtSummary: React.PropTypes.object.isRequired,
};

export default DebtSummaryDetailModal
