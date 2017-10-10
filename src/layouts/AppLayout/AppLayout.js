import React from "react";
import classes from "./AppLayout.scss";

const AppLayout = ({children}) => (
  <div className={classes.layout}>
    <div className={classes.container}>
      {children}
    </div>
  </div>
);

AppLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default AppLayout
