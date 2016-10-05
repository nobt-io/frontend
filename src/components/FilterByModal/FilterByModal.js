import React from 'react'
import styles from './FilterByModal.scss'
import {List, ListItem, ListSubHeader, ListDivider, ListCheckbox} from 'react-toolbox/lib/list';
import Modal from 'components/Modal'

import Avatar from 'components/Avatar'

export const FilterByModal = (props) => {

  const onClose = props.onClose || (() => { });
  const active = props.active || false;
  const onFilterChange = props.onFilterChange || (() => { });

  const onItemClick = (name) => {onFilterChange(name); onClose();}

  var persons = (props.persons || []).map(p => (
    <ListItem onClick={() => onItemClick(p)} itemContent={<div className={styles.listItem}><Avatar size={30} name={p}/><span>{p}</span></div>}/>));

  return (
    <Modal header={"filter expenses by"} active={active} onClose={onClose} >
      <div className={styles.listWrapper}>
        <List selectable ripple>
          <ListItem onClick={() => onItemClick('')} caption="All" leftIcon="apps"/>
          {persons}
        </List>
      </div>
    </Modal>
  );
}

export default FilterByModal
