import * as React from "react";
import { List } from "react-toolbox/lib/list";
import styles from "./Selector.scss"


export default ({children})=> (
  <div className={styles.container}>
    <List selectable theme={styles}>
      {children}
    </List>
  </div>
)
