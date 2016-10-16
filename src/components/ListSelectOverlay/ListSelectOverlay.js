import React from "react";
import styles from "./ListSelectOverlay.scss";
import { List, ListItem } from "react-toolbox/lib/list";
import { LowerScreenOverlay } from "components/Overlay";

export const ListSelectOverlay = (props) => {

  const onItemClick = (name) => {
    props.onSortChange(name);
    props.onClose();
  };

  const listItems = props.items.map(item => (
    <ListItem key={item.name} onClick={() => onItemClick(item.name)} caption={item.displayName|| item.name } leftIcon={item.icon}/>
  ));

  return (
    <LowerScreenOverlay header={props.title} active={props.active} onClose={props.onClose}>
      <div className={styles.listWrapper}>
        <List selectable ripple>{listItems}</List>
      </div>
    </LowerScreenOverlay>
  );
};

ListSelectOverlay.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    displayName: React.PropTypes.string,
    icon: React.PropTypes.string.isRequired
  }))
};

export default ListSelectOverlay
