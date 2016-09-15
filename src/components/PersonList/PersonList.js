import React from 'react'
import styles from './PersonList.scss'

import Avatar from 'components/Avatar'

export const PersonListPanel = React.createClass({

  render: function () {

    const user = this.props.users.map((user) => (
      <div className={styles.PersonItem} key={user}><Avatar name={user}></Avatar><span className={styles.PersonName}>{user}</span></div>
    ));


    return (
      <section>{user}</section>
    );
  },

  getDefaultProps: function() {
    return {
      users: ["david", "heinz"],
    }
  },
});


export default PersonListPanel
