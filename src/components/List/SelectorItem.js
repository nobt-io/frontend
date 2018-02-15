import * as React from "react";
import { ListItem as RTListItem } from "react-toolbox/lib/list";
import styles from "./SelectorItem.scss"

export default class SelectorItem extends React.Component {

  componentDidMount() {
    if (this.props.focus) {
      this.item.children[ 0 ].children[ 0 ].focus()
    }
  }

  render() {
    const value = this.props.value;
    const valueIsSet = (value !== null && value !== undefined && value.length !== 0);

    const none = "javascript:;"; //just used, to create a focusable <a>-tag.
    const setRef = (item) => this.item = item;

    const placeholder = this.props.placeholder;

    return valueIsSet
      ? <div ref={setRef}><RTListItem to={none} selectable {...this.props} theme={styles} caption={value} key={value} legend={null} /></div>
      : <div ref={setRef}><RTListItem to={none} selectable {...this.props} theme={styles} caption={null} key={value} legend={placeholder} /></div>
  }
}
