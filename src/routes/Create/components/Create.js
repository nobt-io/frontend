import React from 'react'
import styles from './Create.scss'
import Button from 'components/Button';

import Header from 'components/Header'
import AddPersonPanel from 'components/AddPersonPanel'
import PersonList from 'components/PersonList'

export const Create = React.createClass({

  getInitialState() {
    return {
      persons: [],
      currentPerson: ""
    }
  },
  addPerson: function(){
    this.setState({
      persons: [...this.state.persons, this.state.currentPerson]
    });
  },

  onValueChange: function(person){
    this.setState({
      currentPerson: person
    });
  },

  isUserValid: function (person) {
    var newUserIsNotEmpty = person != "";
    var userDoesNotExist = this.state.persons.filter(existingUser => existingUser === person).length == 0;
    return newUserIsNotEmpty && userDoesNotExist;
  },

  render: function () {

    const addPersonIsDisabled = !this.isUserValid(this.state.currentPerson);

    return (
      <div className={styles.Create}>
        <Header showButton={true}>
          <Button className={styles.button} icon="check_box">Create</Button>
        </Header>
        <AddPersonPanel buttonIsDisabled={addPersonIsDisabled} buttonAction={this.addPerson} onValueChange={this.onValueChange}>
          Who is involved in <b>das ist ein test</b>?
        </AddPersonPanel>
        <PersonList persons={this.state.persons}></PersonList>
      </div>)
  }
});


Create.propTypes = {
  persons: React.PropTypes.array.isRequired,
  addPerson: React.PropTypes.func.isRequired
};

export default Create
