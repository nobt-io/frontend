import React from 'react'
import styles from './Create.scss'
import Button from 'components/Button';

import Header from 'components/Header'
import AddPersonPanel from 'components/AddPersonPanel'
import AvatarList from 'components/PersonList'

export const Create = React.createClass({
  render: function () {
    return (
      <div className={styles.Create}>
        <Header showButton={true}>
          <Button className={styles.button} icon="check_box">Create</Button>
        </Header>
        <AddPersonPanel buttonAction={() => console.log("action123")}>
          Who is involved in <b>das ist ein test</b>?
        </AddPersonPanel>
        <AvatarList></AvatarList>
      </div>)
  }
});

Create.propTypes = {
  persons: React.PropTypes.array.isRequired,
  addPerson: React.PropTypes.func.isRequired,
}

export default Create
