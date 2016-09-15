import React from 'react'
import styles from './Create.scss'
import Button from 'components/Button';

import Header from 'components/Header'
import AddPersonInput from 'components/AddPersonInput'

export const Create = (props) => (
  <div className={styles.Create}>
    <section>
      <Header showButton={true}>
        <Button className={styles.button} icon="check_box">Create</Button>
      </Header>
    </section>
    <section>
      <AddPersonInput></AddPersonInput>
    </section>
  </div>
)

Create.propTypes = {
  persons: React.PropTypes.array.isRequired,
  addPerson: React.PropTypes.func.isRequired,
}

export default Create
