import React from "react";
import AppBar from "react-toolbox/lib/app_bar";
import styles from "./Header.scss";

export const Header = (props) => (
  <div className={styles.header}>
    <AppBar className={styles.header} fixed>
      <h1>nobt.io</h1>
      <div className={styles.buttonContainer}>
        {props.children}
      </div>
    </AppBar>
  </div>
);

export default Header
