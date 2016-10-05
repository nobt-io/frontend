import React from 'react'
import styles from './SortByModal.scss'
import {List, ListItem, ListSubHeader, ListDivider, ListCheckbox} from 'react-toolbox/lib/list';
import Modal from 'components/Modal'

import Avatar from 'components/Avatar'

export const SortByModal = (props) => {

  const onClose = props.onClose || (() => { });
  const active = props.active || false;
  const onSortChange = props.onSortChange || (() => { });

  const onItemClick = (name) => {onSortChange(name); onClose();}

  return (
    <Modal header={"sort expenses by"} active={active} onClose={onClose} >
      <div className={styles.listWrapper}>
        <List selectable ripple>
          <ListItem onClick={() => onItemClick('Date')} caption="Date" leftIcon="access_time"/>
          <ListItem onClick={() => onItemClick('Amount')} caption="Amount" leftIcon="timeline"/>
        </List>
      </div>
    </Modal>
  );
}

export default SortByModal
