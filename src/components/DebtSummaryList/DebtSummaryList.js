import React from "react";
import DebtSummaryItem from "components/DebtSummaryItem";

export const DebtSummaryList = (props) => {
  var debtSummaryItems = props.debtSummaries.map(s => (<DebtSummaryItem key={s.me.name} summary={s}/>));
  return <div>{debtSummaryItems}</div>;

};

DebtSummaryList.propTypes = {
  debtSummaries: React.PropTypes.array.isRequired
};

export default DebtSummaryList
