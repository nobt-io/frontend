import React from "react";
import styles from "./Person.scss";
import classnames from "classnames";
import { BigAvatar, MediumAvatar } from "components/Avatar";

export const AvatarPosition = {
  LEFT: "LEFT",
  RIGHT: "RIGHT"
};

export const AvatarSize = {
  BIG: "BIG",
  SMALL: "SMALL"
};

const avatarFactory = {
  "BIG": (name) => (<BigAvatar name={name} />),
  "SMALL": (name) => <MediumAvatar name={name} />
};

export const Person = (props) => {
  const avatar = avatarFactory[ props.avatarSize ](props.name);

  const cx = classnames.bind(styles);
  const avatarStyle = cx("avatar", props.avatarClass);

  return (
    <span className={styles.Person} onClick={ () => props.onClick(props.name) }>
      {
        props.avatarPosition === AvatarPosition.LEFT &&
        <span className={styles.left}>
          <span className={avatarStyle}>{avatar}</span>
          <span className={styles.name}>{props.name}</span>
        </span>
      }
      {
        props.avatarPosition === AvatarPosition.RIGHT &&
        <span className={styles.right}>
          <span className={styles.name}>{props.name}</span>
          <span className={avatarStyle}>{avatar}</span>
        </span>
      }
      {props.children}
    </span>
  );
};

Person.propTypes = {
  avatarClass: React.PropTypes.string,
  avatarSize: React.PropTypes.oneOf([ AvatarSize.BIG, AvatarSize.SMALL ]).isRequired,
  avatarPosition: React.PropTypes.oneOf([ AvatarPosition.RIGHT, AvatarPosition.LEFT ]).isRequired,
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

Person.defaultProps = {
  avatarClass: "",
  onClick: (name) => {}
};

export default Person;
