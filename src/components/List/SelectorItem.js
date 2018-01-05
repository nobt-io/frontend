import * as React from "react";
import { ListItem } from "react-toolbox/lib/list";
import styles from "./SelectorItem.scss"

export default (props) => {

  const valueIsSet = (props.value !== null && props.value !== undefined && props.value.length !== 0);

  return valueIsSet
    ? <ListItem selectable {...props} theme={styles} caption={props.value} legend={null} />
    : <ListItem selectable {...props} theme={styles} caption={null} legend={props.placeholder} />
}
