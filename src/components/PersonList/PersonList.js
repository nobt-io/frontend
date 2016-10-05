import React from "react";
import styles from "./PersonList.scss";
import Avatar from "components/Avatar";
import { Button } from "react-toolbox/lib/button";

export const PersonList = React.createClass({

  render: function () {

    const displayRemoveButton = this.props.onPersonRemove == null ? "none" : "inline";

    const persons = this.props.persons.map((person) => (
      <div className={styles.PersonItem} key={person}>
        <Avatar size={40} name={person}></Avatar><span className={styles.PersonName}>{person}</span>
        <Button style={{display: displayRemoveButton}} className={styles.RemoveButton} icon='clear'
                onClick={() => this.props.onPersonRemove(person)} floating/>
      </div>
    ));

    return (
      <div>{persons}</div>
    );
  },

  getDefaultProps: function () {
    return {
      persons: [],
      onPersonRemove: null
    }
  },
});


export default PersonList
