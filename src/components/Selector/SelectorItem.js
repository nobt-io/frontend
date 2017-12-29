import * as React from "react";
import { ListItem } from "react-toolbox/lib/list";
import styles from "./SelectorItem.scss"

export default (props) => (
  <ListItem selectable {...props} theme={styles}/>
)
