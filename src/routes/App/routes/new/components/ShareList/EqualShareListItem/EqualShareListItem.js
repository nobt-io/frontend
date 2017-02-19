import React from "react";
import Checkbox from "react-toolbox/lib/checkbox";
import styles from "./EqualShareListItem.scss";
import ShareListItem from "../ShareListItem";
import CheckboxTheme from "./CheckboxTheme.scss";

const EqualShareListItem = (props) => {

  const handleOnCheckboxChanged = (newState) => props.onCheckboxChange(name, newState);

  const {name, amount, value} = props.share;

  return (
    <ShareListItem
      key={props.name}
      name={name}
      amount={amount}
      control={<Checkbox
        theme={CheckboxTheme}
        checked={value}
        onChange={handleOnCheckboxChanged}
      />}
      controlClass={styles.equalShareCheckboxContainer}
    />
  )
};

export default EqualShareListItem

EqualShareListItem.propTypes = {
  share: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    amount: React.PropTypes.number,
    value: React.PropTypes.bool.isRequired,
  }),
  onCheckboxChange: React.PropTypes.func.isRequired
};
