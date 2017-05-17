import React from "react";
import styles from "./StartButton.scss";

const StartButton = (props) => {

  let className = (props.active) ? styles.activeButton : styles.button;

  return (
    <a className={className} href="#">
      Start splitting your bills
    </a>
  )
};

StartButton.propTypes = {
  active: React.PropTypes.bool
};

export default StartButton
