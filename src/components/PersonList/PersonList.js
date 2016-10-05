import React from "react";
import styles from "./PersonList.scss";
import Avatar from "components/Avatar";
import { Button } from "react-toolbox/lib/button";

export const PersonList = (props) => {

  const displayRemoveButton = props.hasDeleteButton ? "none" : "inline";

  const persons = props.persons.map((person) => (
    <div className={styles.PersonItem} key={person}>
      <Avatar size={40} name={person}/>
      <span className={styles.PersonName}>{person}</span>
      <Button style={{display: displayRemoveButton}} className={styles.RemoveButton} icon='clear'
              onClick={() => props.onPersonRemove(person)} floating/>
    </div>
  ));

  return (
    <div>{persons}</div>
  );
};

PersonList.propTypes = {
  persons: React.PropTypes.array.isRequired,
  onPersonRemove: React.PropTypes.func,
  hasDeleteButton: React.PropTypes.bool
};

PersonList.defaultProps = {
  persons: [],
  onPersonRemove: () => { },
  hasDeleteButton: false,
};

export default PersonList
