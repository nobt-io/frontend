import React from 'react'
import styles from './Create.scss'

import Button from 'components/Button';
import Header from 'components/Header'
import AddPersonPanel from 'components/AddPersonPanel'
import PersonList from 'components/PersonList'


export const Create = React.createClass({

  componentWillMount(){
    var nobtName = this.props.params.nobtName;
    this.props.setNobtName(nobtName);
  },

  getInitialState() {
    return { currentPerson: "" }
  },

  onValueChange: function(person){
    this.setState({
      currentPerson: person
    });
  },

  isUserValid: function (person) {
    var newUserIsNotEmpty = person != "";
    var userDoesNotExist = this.props.persons.filter(existingUser => existingUser === person).length == 0;
    return newUserIsNotEmpty && userDoesNotExist;
  },

  createNobt: function(){
    this.props.createNobt().then((response) => {
      this.props.history.push(`/nobt/${response.data.id}`);
    }, () => {
      //Todo: show error!
    });
  },

  render: function () {

    const createNobtIsDisabled = !this.props.persons.length > 0;
    const addPersonIsDisabled = !this.isUserValid(this.state.currentPerson);

    return (
      <div className={styles.Create}>
        <Header showButton={true}>
          <Button className={styles.button} disabled={createNobtIsDisabled} icon="check_box" onClick={this.createNobt}>Create</Button>
        </Header>
        <AddPersonPanel
          buttonIsDisabled={addPersonIsDisabled} onButtonClick={() => this.props.addPerson(this.state.currentPerson)} onValueChange={this.onValueChange}>
          Who is involved in <b>{this.props.nobtName}</b>?
        </AddPersonPanel>
        <PersonList persons={this.props.persons} onPersonRemove={this.props.removePerson}></PersonList>
      </div>)
  }
});


Create.propTypes = {
  persons: React.PropTypes.array.isRequired,
  addPerson: React.PropTypes.func.isRequired
};

export default Create
