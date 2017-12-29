import * as React from "react";
import styles from "./Section.scss"

export default ({caption, legend, children}) => (
  <div className={styles.section}>
    {caption && (<h2 className={styles.sectionCaption}>{caption}</h2>)}
    {legend && (<p className={styles.sectionLegend}>{legend}</p>)}
    {children}
  </div>
)
