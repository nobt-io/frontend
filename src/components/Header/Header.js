import React from "react";
import AppBar from "react-toolbox/lib/app_bar";
import styles from "./Header.scss";

export const Header = (props) => (
  <div className={styles.headerContainer}>
    <div className={`${props.theme.header} ${styles.header}`}>
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
    </div>
  </div>
);


const headerPropTypes = {
  left: React.PropTypes.element,
  right: React.PropTypes.element,
  theme: React.PropTypes.shape({
    leftContainer: React.PropTypes.string,
    rightContainer: React.PropTypes.string,
    header: React.PropTypes.string,
  })
};

const headerDefaultProps = {
  left: null,
  right: null,
  theme: {
    leftContainer: "",
    rightContainer: "",
    header: ""
  }
};

Header.propTypes = headerPropTypes;
Header.defaultProps = headerDefaultProps;

export default Header
