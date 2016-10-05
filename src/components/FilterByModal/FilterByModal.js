import React from "react";
import styles from "./FilterByModal.scss";
import { List, ListItem, ListDivider } from "react-toolbox/lib/list";
import Modal from "components/Modal";
import Avatar from "components/Avatar";

export const FilterByModal = (props) => {

  const onItemClick = (name) => {
    props.onFilterChange(name);
    props.onClose();
  };

  var persons = props.persons.map(p => (
    <ListItem onClick={() => onItemClick(p)} itemContent={
      <div className={styles.listItem}><Avatar size={30} name={p}/><span>{p}</span></div>
    }/>));

  return (
    <Modal header={"filter expenses by"} active={props.active} onClose={props.onClose}>
      <div className={styles.listWrapper}>
        <List selectable ripple>
          <ListItem onClick={() => onItemClick('')} caption="Show all members" leftIcon="apps"/>
          <ListDivider/>
          {persons}
        </List>
      </div>
    </Modal>
  );
};

FilterByModal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  onFilterChange: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
  persons: React.PropTypes.array.isRequired,
};

export default FilterByModal
