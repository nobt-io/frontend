import React from "react";
import ShareListItem from "../ShareListItem";
import DecimalNumberInput from "components/DecimalNumberInput";

import styles from "./CustomShareListItem.scss"

const CustomShareListItem = (props) => {

  const handleOnInputChanged = (newState) => props.onAmountChange(name, newState);
  const {name, value} = props.share;

  return (
    <ShareListItem
      name={name}
      control={<DecimalNumberInput
        value={value}
        onChange={handleOnInputChanged}
      />}
      controlClass={styles.customShareInputContainer}
    />
  )
};

export default CustomShareListItem

CustomShareListItem.propTypes = {
  share: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
  }),
  onAmountChange: React.PropTypes.func.isRequired
};
