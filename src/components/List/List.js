import * as React from "react";
import { List as RTList } from "react-toolbox-legacy/lib/list";
import styles from "./List.scss"


export default ({children})=> (
  <div className={styles.container}>
    <RTList selectable theme={styles}>
      {children}
    </RTList>
  </div>
)
