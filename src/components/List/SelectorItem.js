import * as React from "react";
import { ListItem } from "react-toolbox/lib/list";
import styles from "./SelectorItem.scss"

export default ({value, placeholder, ...props}) => {

  const valueIsSet = (value !== null && value !== undefined && value.length !== 0);

  return valueIsSet
    ? <ListItem to={"javascript:;"} selectable {...props} theme={styles} caption={value} key={value} legend={null} />
    : <ListItem to={"javascript:;"} selectable {...props} theme={styles} caption={null} key={value} legend={placeholder} />
}
