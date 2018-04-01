import * as React from "react";
import styles from "./Section.scss"

export default ({children}) => (
  <div className={styles.section}>
    {children}
  </div>
)
