import React from "react";
import styles from "./StartButton.scss";

export default class StartButton extends React.Component {

  render = () => (
    <a className={styles.button}>
      Start splitting your bills
    </a>
  )
}
