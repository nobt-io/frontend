import React from "react";
import styles from "./SortByModal.scss";
import { List, ListItem } from "react-toolbox/lib/list";
import Modal from "components/Modal";

export const SortByModal = (props) => {

  const onItemClick = (name) => {
    props.onSortChange(name);
    props.onClose();
  };

  return (
    <Modal header={"sort expenses by"} active={props.active} onClose={props.onClose}>
      <div className={styles.listWrapper}>
        <List selectable ripple>
          <ListItem onClick={() => onItemClick('Date')} caption="Date" leftIcon="access_time"/>
          <ListItem onClick={() => onItemClick('Amount')} caption="Amount" leftIcon="timeline"/>
        </List>
      </div>
    </Modal>
  );
};

SortByModal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
};


export default SortByModal
