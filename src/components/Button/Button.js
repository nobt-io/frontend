import PropTypes from 'prop-types';
import React from "react";
import styles from "./Button.scss";
import { Button as RTButton } from "react-toolbox-legacy/lib/button";

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
  rightIcon: PropTypes.bool
};

export default Button
