import React from 'react'
import styles from './AddExpense.scss'
import PersonList from 'components/PersonList'

export const AddExpense = React.createClass({

  componentWillMount(){

  },

  render: function () {

    return (
      <div className={styles.AddExpense}>
        <p>Test</p>
        <PersonList persons={this.props.member} />
      </div>
    );
  }
});

export default AddExpense
