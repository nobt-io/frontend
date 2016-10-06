import React from "react";
import styles from "./PersonMoneyList.scss";
import {Avatar} from "components/Avatar";
import Amount from "components/Amount"

const getAmountKeyWord = (isPositive) => isPositive ? "gets" : "owes";

const getPersonMoneyListItem = (person, showKeyword) => (
  <div key={person.name} className={styles.row}>
    <div className={styles.avatarCell}><Avatar name={person.name} size={30}/></div>
    <div className={styles.nameCell}>{person.name}</div>
    <div className={styles.amountCell}>
      <span style={{display: (showKeyword) ? "inline" : "none"}}>{getAmountKeyWord(!(person.amount > 0))}</span>
      <Amount value={person.amount} spanClass={styles.amount} />
    </div>
    <div style={{clear: "both"}}></div>
  </div>
);

export const PersonMoneyList = (props) => {

  const showKeyword = props.showKeyword;
  const personItems = props.persons.map(p => getPersonMoneyListItem(p, showKeyword));

  return (<div className={styles.container}>{personItems}</div>)
};

PersonMoneyList.propTypes = {
  persons: React.PropTypes.array.isRequired,
  showKeyword: React.PropTypes.bool
};

PersonMoneyList.defaultProps = {
  showKeyword: false,
};

export default PersonMoneyList
