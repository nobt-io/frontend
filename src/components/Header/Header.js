import React from "react";
import AppBar from "react-toolbox/lib/app_bar";
import styles from "./Header.scss";
import { Button } from "react-toolbox/lib/button";

export const Header = (props) => (



  <div className={styles.header}>
    <AppBar className={styles.header} fixed>
      <h1 style={{display: props.showNobtHeader ? "block" : "none"}}>nobt.io</h1>
      {
        (props.leftButton) &&
        (<div className={styles.leftContainer}>
          <Button className={styles.button} icon={props.leftButton.icon} onClick={props.leftButton.onClick}>{props.leftButton.title}</Button>
        </div>)
      }
      {
        (props.rightButton) &&
        (<div className={styles.rightContainer}>
          <Button className={styles.button} icon={props.rightButton.icon} onClick={props.rightButton.onClick}>{props.rightButton.title}</Button>
        </div>)
      }
    </AppBar>
  </div>
);

Header.propTypes = {
  leftButton: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
  }),
  rightButton: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
  }),
  showNobtHeader: React.PropTypes.bool,
};

Header.defaultProps = {
  leftButton: null,
  rightButton: null,
  showNobtHeader: true
};

export default Header
