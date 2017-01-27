import React from 'react'
import styles from './Button.scss'
import { Button as RTButton } from "react-toolbox/lib/button";

const Button = (props) => {

  let givenTheme = props.theme;

  if (props.rightIcon) {
    givenTheme.icon = styles.rightIcon;
  }

  return (
    <RTButton {...props} theme={givenTheme} />
  )
};

export default Button
