import * as React from "react";
import styles from "./Container.scss"

function container(style) {
  return ({children}) => (<div className={style}>{children}</div>);
}

exports.Page = container(styles.page);
exports.Main = container(styles.main);

exports.NonLabelInputContainer = container(styles.nonLabelInputContainer);
