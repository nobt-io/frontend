import React from "react";
import PercentageInput from "components/PercentageInput";

import styles from "./PercentalShareListItem.scss"

import ShareListItem from "../ShareListItem";

const PercentalShareListItem = (props) => {

  const handleOnPercentageChanged = (newState) => props.onPercentageChange(name, newState);

  const {name, amount, value} = props.share;

  return (
    <ShareListItem
      name={name}
      amount={amount}
      control={<PercentageInput
        value={value}
        onChange={handleOnPercentageChanged}
      />}
      controlClass={styles.percentalShareInputContainer}
    />
  )
};

export default PercentalShareListItem

PercentalShareListItem.propTypes = {
  share: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    amount: React.PropTypes.number,
    value: React.PropTypes.number.isRequired,
  }),
  onPercentageChange: React.PropTypes.func.isRequired
};
