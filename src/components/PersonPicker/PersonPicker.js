import React from 'react'
import {List, ListItem} from "react-toolbox/lib/list"

import { AvatarSize } from "components/Avatar"
import { Person, AvatarPosition } from "components/Person"

import styles from './PersonPicker.scss'

export const PersonPicker = (props) => (
  <List selectable ripple>
    {
      props.names.map((name) => (
        <ListItem onClick={() => props.onPersonPicked(name)}>
          <Person
            name={name}
            avatarSize={AvatarSize.SMALL}
            avatarPosition={AvatarPosition.LEFT}
          />
        </ListItem>
      ))
    }
  </List>
);

export default PersonPicker

PersonPicker.propTypes = {
  names: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  onPersonPicked: React.PropTypes.func
};

PersonPicker.defaultProps = {
  onPersonPicked: (name) => { }
};
