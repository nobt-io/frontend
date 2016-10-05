import React from "react";
import styles from "./PersonSelectorModal.scss";
import { List, ListItem, ListDivider } from "react-toolbox/lib/list";
import { LowerScreenModal } from "components/Modal";
import Avatar from "components/Avatar";
import SingleInputInlineForm from "components/SingleInputInlineForm"
import FontIcon from 'react-toolbox/lib/font_icon';

export const PersonSelectorModal = (props) => {

  const onItemClick = (name) => {
    props.onFilterChange(name);
    props.onClose();
  };

  var persons = props.persons.map(p => (
    <ListItem onClick={() => onItemClick(p)} itemContent={
      <div className={styles.listItem}><Avatar size={30} name={p}/><span>{p}</span></div>
    }/>));

  return (
    <LowerScreenModal header={props.title} active={props.active} onClose={props.onClose}>
      <div className={styles.listWrapper}>
        <List selectable ripple>
          <div style={{display: props.canSelectAll ? "block" : "none"}}>
            <ListItem onClick={() => onItemClick('')} caption="Show all members" leftIcon="apps"/>
            <ListDivider/>
          </div>
          {persons}
          <div style={{display: props.canInsertPerson ? "block" : "none"}}>
            <ListDivider/>
            <div className={styles.addPanel}>
              <FontIcon  className={styles.addIcon} value='person_add'/>
              <SingleInputInlineForm buttonIcon="add_circle_outline" placeholder="Anyone else?"
                                     onSubmit={(p) => onItemClick(p)}/>
            </div>
          </div>
        </List>
      </div>
    </LowerScreenModal>
  );
};

PersonSelectorModal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  onFilterChange: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  persons: React.PropTypes.array.isRequired,
  canSelectAll: React.PropTypes.bool,
  canInsertPerson: React.PropTypes.bool
};

PersonSelectorModal.defaultProps = {
  canSelectAll: false,
  canInsertPerson: false,
}

export default PersonSelectorModal
