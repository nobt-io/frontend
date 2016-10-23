import React from 'react'
import {List} from "react-toolbox/lib/list"

import { Person, AvatarSize, AvatarPosition } from "components/Person"

import styles from './PersonPicker.scss'

export const PersonPicker = (props) => (
  <List selectable ripple>
    {
      props.names.map((name) => (
        <Person
          name={name}
          onClick={props.onPersonPicked}
          avatarSize={AvatarSize.SMALL}
          avatarPosition={AvatarPosition.LEFT}
        />
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
