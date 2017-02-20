import React from "react"
import styles from "./AvatarList.scss"
import AvatarSize from "../avatarSize"
import avatarFactory from "../avatarFactory"

const AvatarList = (props) => (
  <div className={styles.avatarList}>
    {props.names.map( name => avatarFactory(name, props.size) )}
  </div>
);

export default AvatarList;

AvatarList.propTypes = {
  names: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  size: React.PropTypes.oneOf([ AvatarSize.SMALL, AvatarSize.MEDIUM, AvatarSize.BIG ]).isRequired
};
