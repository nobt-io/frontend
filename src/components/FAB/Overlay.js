import * as React from "react";
import styles from "./Overlay.scss"
import classNames from "classnames"

export default ({onClick, expanded}) =>
  <div
    className={classNames(styles.overlay, {
      [styles.active]: expanded
    })}
    onClick={() => {
      if (expanded) {
        onClick()
      }
    }}
  />;
