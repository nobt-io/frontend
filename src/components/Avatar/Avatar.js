import React from 'react'
import styles from './Avatar.scss'
import RTAvatar from 'react-toolbox/lib/avatar';

export const Avatar = (props) => (
  <RTAvatar className={styles.Avatar} title={props.name} image={"https://api.adorable.io/avatars/"+props.size+"/"+props.name} />
);

Avatar.propTypes = {
  size: React.PropTypes.number.isRequired
};

export default Avatar
