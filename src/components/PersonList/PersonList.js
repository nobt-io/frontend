import React from 'react'
import styles from './PersonList.scss'

import Avatar from 'components/Avatar'
import {Button} from 'react-toolbox/lib/button';

export const PersonListPanel = React.createClass({

  render: function () {

    const user = this.props.persons.map((person) => (
      <div className={styles.PersonItem} key={person}>
        <Avatar size={40} name={person}></Avatar><span className={styles.PersonName}>{person}</span>
        <Button className={styles.RemoveButton} icon='clear' onClick={() => this.props.onPersonRemove(person)} floating/>
      </div>
    ));


    return (
      <section>{user}</section>
    );
  },

  getDefaultProps: function() {
    return {
      persons: [],
      onPersonRemove: (personToRemove) => {}
    }
  },
});


export default PersonListPanel
