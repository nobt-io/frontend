import React from 'react'
import Header from 'components/Header'
import styles from './AddExpense.scss'
import PersonList from 'components/PersonList'
import {initialState} from '../modules/AddExpense'

export const AddExpense = React.createClass({

  componentWillMount(){
    this.props.loadNobt(this.props.params.id);
  },

  getInitialState: function() {
    return initialState;
  },

  render: function () {

    return (
      <div className={styles.AddExpense}>
        <Header/>
        <h1>Add expense</h1>
        <PersonList persons={this.props.members} />
      </div>
    );
  }
});

export default AddExpense
