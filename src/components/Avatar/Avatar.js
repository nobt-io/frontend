import React from 'react'
import RTAvatar from 'react-toolbox/lib/avatar';

export const Avatar = (props) => (
  <RTAvatar title={props.name} image={"https://api.adorable.io/avatars/40"+props.name} />
);

export default Avatar
