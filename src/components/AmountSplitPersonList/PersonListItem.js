import React from 'react'
import styles from './PersonListItem.scss'

import {Avatar} from 'components/Avatar'

export const PersonListItem = (props) => (
  <div {...props} className={styles.row}>
    <span className={styles.splitter}>{props.children}</span>
    <span className={styles.avatarContainer}><Avatar name={props.name} size={30}/></span>
    <span className={styles.name}>{props.name}</span>
  </div>
);

PersonListItem.propTypes = {
  name: React.PropTypes.string.isRequired
};

export default PersonListItem
