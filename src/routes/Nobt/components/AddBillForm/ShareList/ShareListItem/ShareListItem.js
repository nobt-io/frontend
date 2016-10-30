import React from "react";
import styles from "./ShareListItem.scss";
import { AvatarSize } from "components/Avatar";
import { Person, AvatarPosition } from "components/Person";
import Amount from "components/Amount";

export const ShareListItem = (props) => (
  <div className={styles.ShareListItem}>
    <div className={styles.personContainer}>
      <Person name={props.name} avatarPosition={AvatarPosition.LEFT} avatarSize={AvatarSize.MEDIUM} />
    </div>
    {props.amount != null && <Amount spanClass={styles.amount} value={props.amount} />}
    <div className={`${styles.controlContainer} ${props.controlClass}`}>
      {props.control}
    </div>
  </div>
);

export default ShareListItem

ShareListItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number,
  control: React.PropTypes.element.isRequired,
  controlClass: React.PropTypes.string,
};
