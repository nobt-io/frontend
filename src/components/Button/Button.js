import React from "react";
import styles from "./Button.scss";
import { Button as RTButton } from "react-toolbox/lib/button";

const Button = (props) => {

  let givenTheme = {...props.theme, button: styles.button};

  if (props.rightIcon) {
    givenTheme.icon = styles.rightIcon;
  }

  let otherProps = {...props};
  delete otherProps.rightIcon;

  return (
    <RTButton {...otherProps} theme={givenTheme} raised />
  )
};

Button.propTypes = {
  rightIcon: React.PropTypes.bool
};

export default Button
