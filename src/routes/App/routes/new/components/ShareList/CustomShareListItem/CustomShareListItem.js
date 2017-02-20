import React from "react";
import ShareListItem from "../ShareListItem";
import CurrencyInput from "components/CurrencyInput";

import styles from "./CustomShareListItem.scss"

const CustomShareListItem = (props) => {

  const handleOnInputChanged = (newState) => props.onAmountChange(name, newState);
  const {name, value} = props.share;

  return (
    <ShareListItem
      name={name}
      control={<CurrencyInput
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
