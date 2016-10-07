import React from "react";
import BillItem from "components/BillItem";

export const BillList = (props) => {
  var billItem = props.bills.map(e => (<BillItem key={e.id} bill={e} />));
  return <div>{billItem}</div>;
};

BillList.propTypes = {
  bills: React.PropTypes.array.isRequired
};

export default BillList;
