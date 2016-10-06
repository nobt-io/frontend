import React from "react";
import styles from "./Person.scss";
import { BigAvatar, SmallAvatar } from "components/Avatar";

export const AvatarPositions = {
  LEFT: "LEFT",
  RIGHT: "RIGHT"
};

export const AvatarSize = {
  BIG: "BIG",
  SMALL: "SMALL"
};

// TODO this does not work yet.
const avatarFactory = {
  "BIG": (name) => (<BigAvatar name={name} />),
  "SMALL": (name) => <SmallAvatar name={name} />
};

export const Person = (props) => {

  const avatar = avatarFactory[ props.avatarSize ](props.name);

  return (
    <span className={styles.Person}>
      {
        props.avatarPosition === AvatarPositions.LEFT &&
        <span className={styles.left}>
          <span className={styles.avatar}>{avatar}</span>
          <span className={styles.name}>{props.name}</span>
        </span>
      }
      {
        props.avatarPosition === AvatarPositions.RIGHT &&
        <span className={styles.right}>
          <span className={styles.name}>{props.name}</span>
          <span className={styles.avatar}>{avatar}</span>
        </span>
      }
    </span>
  );
};

Person.propTypes = {
  avatarSize: React.PropTypes.oneOf([ AvatarSize.BIG, AvatarSize.SMALL ]).isRequired,
  avatarPosition: React.PropTypes.oneOf([ AvatarPositions.RIGHT, AvatarPositions.LEFT ]).isRequired,
  name: React.PropTypes.string.isRequired
};

export default Person
