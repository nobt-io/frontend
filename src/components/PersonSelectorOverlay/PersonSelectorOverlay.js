import React from "react";
import styles from "./PersonSelectorOverlay.scss";
import { List, ListItem, ListDivider } from "react-toolbox/lib/list";
import { LowerScreenOverlay } from "components/Overlay";
import {Avatar} from "components/Avatar";
import SingleInputInlineForm from "components/SingleInputInlineForm"
import FontIcon from 'react-toolbox/lib/font_icon';

export const PersonSelectorOverlay = (props) => {

  const onItemClick = (name) => {
    props.onFilterChange(name);
    props.onClose();
  };

  var persons = props.names.map(name => (
    <ListItem key={name} onClick={() => onItemClick(name)} itemContent={
      <div className={styles.listItem}><Avatar size={30} name={name}/><span>{name}</span></div>
    }/>));

  return (
    <LowerScreenOverlay header={props.title} active={props.active} onClose={props.onClose}>
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
              <SingleInputInlineForm buttonIcon="add_circle_outline"
                                     placeholder="Someone else?"
                                     onSubmit={(p) => onItemClick(p)}/>
            </div>
          </div>
        </List>
      </div>
    </LowerScreenOverlay>
  );
};

PersonSelectorOverlay.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  onFilterChange: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  names: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  canSelectAll: React.PropTypes.bool,
  canInsertPerson: React.PropTypes.bool
};

PersonSelectorOverlay.defaultProps = {
  canSelectAll: false,
  canInsertPerson: false,
}

export default PersonSelectorOverlay
