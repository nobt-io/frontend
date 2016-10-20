import React from "react";
import AppBar from "react-toolbox/lib/app_bar";
import styles from "./Header.scss";

export const Header = (props) => (

  <div className={styles.headerContainer}>
    <AppBar className={styles.header} fixed>
      {
        (props.left) &&
        (<div className={`${props.theme.leftContainer} ${styles.leftContainer}`}>
          {props.left}
        </div>)
      }
      {
        (props.right) &&
        (<div className={`${props.theme.rightContainer} ${styles.rightContainer}`}>
          {props.right}
        </div>)
      }
    </AppBar>
  </div>
);

Header.propTypes = {
  left: React.PropTypes.element,
  right: React.PropTypes.element,
  theme: React.PropTypes.shape({
    leftContainer: React.PropTypes.string,
    rightContainer: React.PropTypes.string,
  })
};

Header.defaultProps = {
  left: null,
  right: null,
  theme: {
    leftContainer: "",
    rightContainer: "",
  }
};

export default Header
