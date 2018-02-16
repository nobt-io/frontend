import * as React from "react";
import { ListItem as RTListItem } from "react-toolbox/lib/list";
import styles from "./SelectorItem.scss"
import withCtrlCheckAction from "../hoc/withCtrlCheckAction";

class SelectorItem extends React.Component {

  componentDidMount() {
    if (this.props.focus) {
      this.item.children[ 0 ].children[ 0 ].focus()
    }
  }

  clickWrapper() {
    if (!this.props.isCtrlClicked()) {
      this.props.onClick();
    }
  }

  render() {
    const value = this.props.value;
    const valueIsSet = (value !== null && value !== undefined && value.length !== 0);

    const none = "javascript:;"; //just used, to create a focusable <a>-tag.
    const setRef = (item) => this.item = item;

    const legend = this.props.placeholder;

    return (
      <div ref={setRef}> {valueIsSet
        ? (<RTListItem to={none} selectable {...this.props} onClick={() => this.clickWrapper()} theme={styles} caption={value} key={value}
                       legend={null} />)
        : (<RTListItem to={none} selectable {...this.props} onClick={() => this.clickWrapper()} theme={styles} caption={null} key={value}
                       legend={legend} />)}
      </div>);
  }
}

export default withCtrlCheckAction(SelectorItem)
