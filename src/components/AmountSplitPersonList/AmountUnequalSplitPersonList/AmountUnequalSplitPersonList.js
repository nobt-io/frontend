import React from 'react'
import CurrencyInput from 'components/CurrencyInput';
import styles from './AmountUnequalSplitPersonList.scss'

import Amount from 'components/Amount';
import PersonListItem from "../Common/PersonListItem"
import TopInfo from "../Common/TopInfo"
import { FormattedMessage } from "react-intl";

export const AmountUnequalSplitPersonList = (props) => {

  const {persons, selectedPersons, addOrUpdateSelectedPerson, selectedAmount, totalAmount} = props;

  const onInputChange = (person, value) => {
    addOrUpdateSelectedPerson({name: person, value: value});
  };

  const personItems = persons.map(p => {
    const value = (selectedPersons.filter(s => s.name === p)[ 0 ] || {amount: 0}).amount;

    return (
      <PersonListItem key={p} name={p}>
        <CurrencyInput className={styles.input} onChange={v => onInputChange(p, v)} value={value} />
      </PersonListItem>);
  });

  const message = (<FormattedMessage
    id="debtSummary.detail.model.debtStatement"
    defaultMessage={"added amounts ({selectedAmount}) don't match total amount ({totalAmount})"}
    values={{selectedAmount: <Amount value={selectedAmount} />, totalAmount: <Amount value={totalAmount} />}} />);

  return (
    <div>
      { selectedAmount !== totalAmount && <TopInfo>{message}</TopInfo>}
      { personItems }
    </div>);
};

AmountUnequalSplitPersonList .propTypes = {
  selectedPersons: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
    amount: React.PropTypes.number.isRequired,
  })),
  persons: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  totalAmount: React.PropTypes.number.isRequired,
  selectedAmount: React.PropTypes.number.isRequired,
  addOrUpdateSelectedPerson: React.PropTypes.func.isRequired
};

export default AmountUnequalSplitPersonList;
