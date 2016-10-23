import React from "react";
import styles from "./Header.scss";

export const Header = (props) => (
  <div className={styles.headerContainer}>
    <div className={`${props.theme.header} ${styles.header}`}>
      <div className={`${props.theme.leftContainer} ${styles.leftContainer}`}>
        {props.left}
      </div>
      <div className={`${props.theme.rightContainer} ${styles.rightContainer}`}>
        {props.right}
      </div>
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
