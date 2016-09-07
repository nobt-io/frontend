import React from 'react'
import classes from './Create.scss'

import Header from 'components/Header'

export const Create = (props) => (
  <div className={classes['Create']}>
    <Header></Header>
    <h4>Create</h4>
        <div>Personen: {props.persons.join(", ")}</div>

    <button className='btn btn-default' onClick={() => props.addPerson("david")}>Add David</button>
    <button className='btn btn-default' onClick={() => props.addPerson("felix")}>Add Felix</button>
  </div>
)

Create.propTypes = {
  persons: React.PropTypes.array.isRequired,
  addPerson: React.PropTypes.func.isRequired,
}

export default Create
