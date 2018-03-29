import * as React from "react";
import { ListItem as RTListItem } from "react-toolbox/lib/list";
import styles from "./SelectorItem.scss"

class SelectorItem extends React.Component {

  componentDidMount() {
    if (this.props.focus) {
      this.item.focus()
    }
  }

  render() {
    const value = this.props.value;
    const valueIsSet = (value !== null && value !== undefined && value.length !== 0);

    const setRef = (item) => this.item = item;

    const listItemProps = valueIsSet
      ? {caption: value, legend: null}
      : {caption: null, legend: this.props.placeholder};

    const onClick = this.props.onClick;
    const propsWithoutClick = {...this.props, onClick: null};

    return (
      <a className={styles.link} href="javascript:void(0);" ref={setRef} onClick={onClick}>
        <RTListItem selectable {...propsWithoutClick} theme={styles} key={value} {...listItemProps} />
      </a>);
  }
}

export default SelectorItem
