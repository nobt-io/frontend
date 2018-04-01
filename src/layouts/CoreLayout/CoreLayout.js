import React from "react";
import classes from "./CoreLayout.scss";

export const CoreLayout = ({children}) => (
  <div className={classes.container} >
    {children}
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
