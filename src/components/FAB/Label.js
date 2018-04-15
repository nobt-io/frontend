import * as React from "react";
import LabelStyles from "./Label.scss"
import classNames from "classnames";

export default ({disabled, expanded, children}) =>
  <span className={classNames(LabelStyles.label, {
    [LabelStyles.expanded]: expanded,
    [LabelStyles.disabled]: disabled
  })}>
    {children}
  </span>;
