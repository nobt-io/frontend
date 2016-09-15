import React from 'react'
import styles from './PersonList.scss'

import Avatar from 'components/Avatar'

export const PersonListPanel = React.createClass({

  render: function () {

    const user = this.props.persons.map((person) => (
      <div className={styles.PersonItem} key={person}><Avatar name={person}></Avatar><span className={styles.PersonName}>{person}</span></div>
    ));


    return (
      <section>{user}</section>
    );
  },

  getDefaultProps: function() {
    return {
      persons: []
    }
  },
});


export default PersonListPanel
