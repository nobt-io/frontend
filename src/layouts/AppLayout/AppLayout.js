import React from "react";
import classes from "./AppLayout.scss";
import "../../styles/core.scss";

const AppLayout = ({children}) => (
  <div className={classes.layout} >
  <div className={classes.container} >
    {children}
  </div>
  </div>
);

AppLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default AppLayout
