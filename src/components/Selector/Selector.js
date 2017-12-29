import * as React from "react";
import { List } from "react-toolbox/lib/list";
import styles from "./styles.scss"


export default ({children})=> (
  <div className={styles.container}>
    <List selectable theme={styles}>
      {children}
    </List>
  </div>
)
