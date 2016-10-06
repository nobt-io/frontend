import React from "react";
import styles from "./ListSelectModal.scss";
import { List, ListItem } from "react-toolbox/lib/list";
import { LowerScreenModal } from "components/Modal";

export const ListSelectModal = (props) => {

  const onItemClick = (name) => {
    props.onSortChange(name);
    props.onClose();
  };

  const listItems = props.list.map(item => (
    <ListItem key={item.name} onClick={() => onItemClick(item.name)} caption={item.displayName|| item.name } leftIcon={item.icon}/>
  ));

  return (
    <LowerScreenModal header={props.title} active={props.active} onClose={props.onClose}>
      <div className={styles.listWrapper}>
        <List selectable ripple>{listItems}</List>
      </div>
    </LowerScreenModal>
  );
};

ListSelectModal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  list: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    displayName: React.PropTypes.string,
    icon: React.PropTypes.string.isRequired
  }))
};

export default ListSelectModal
