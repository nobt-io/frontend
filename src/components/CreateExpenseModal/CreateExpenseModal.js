import React from 'react'
import styles from './CreateExpenseModal.scss'
import { FullScreenModal } from "components/Modal";
import Header from "components/Header";
import Input from "react-toolbox/lib/input";
import PersonSelectorModal from "components/PersonSelectorModal";
import DatePickerModal from "components/DatePickerModal";
import Avatar from "components/Avatar";
import ReactDOM from "react-dom";

export const CreateExpenseModal = React.createClass({

  //TODO: Replace With any library
  formatDate: (date) => {

    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    return dd + "." + mm + "." + yyyy;
  },

  refreshState: function (udpate) {
    this.props.updateState({...this.props.editState, ...udpate});
  },

  updateSubject: function(subject){
    this.refreshState({subject: subject})
  },

  updatePaidByPerson: function(person){
    this.refreshState({paidByPerson: person})
  },

  updateDate: function(date){
    this.refreshState({creationDate: date})
  },
  onPersonModalOpen: function () {
    this.setState({...this.state, personModalIsActive: true});
  },

  onPersonModalClose: function () {
    this.setState({...this.state, personModalIsActive: false});
  },

  onDateModalOpen: function () {
    this.setState({...this.state, dateModalIsActive: true});
  },

  onDateModalClose: function () {
    this.setState({...this.state, dateModalIsActive: false});
  },

  render: function () {

    const {personModalIsActive, dateModalIsActive} = this.state || {};

    const {amount, creationDate, selectedPersons, paidByPerson, subject} = this.props.editState;
    const {onClose, onCreateExpense, active, persons} = this.props;

    const dateString =
      new Date().toDateString() === new Date(creationDate).toDateString() ? "Today" : "on "+this.formatDate(new Date(creationDate));

    var expenseIsValid = subject.length > 0;

    return (
      <FullScreenModal active={active} onClose={onClose}>
        <PersonSelectorModal
          title={"Who paid?"} canInsertPerson={true}
          active={personModalIsActive} onClose={this.onPersonModalClose} onFilterChange={(p) => this.updatePaidByPerson(p)} persons={persons}
        />
        <DatePickerModal
          title={"When?"}
          active={dateModalIsActive} onClose={this.onDateModalClose} onDateChange={(d) => this.updateDate(d)}
        />
        <Header
          showNobtHeader={false}
          rightButton={!expenseIsValid ? {} : {icon: "check_box", onClick: () => onCreateExpense(), title: "Create expense"}}
          leftButton={{icon: "arrow_back", onClick: () => onClose(), title: "Back"}}/>
        <div className={styles.headInput}>
          <div>
            <Input placeholder="What was bought?" value={subject} autoComplete="off" onChange={this.updateSubject} className={styles.subjectInput}/>
          </div>
          <div>
            <span onClick={() => this.onPersonModalOpen()} className={styles.personPicker}>by {paidByPerson}<Avatar size={20} fontSize={11} name={paidByPerson} /></span>
            <span onClick={() => this.onDateModalOpen()} className={styles.datePicker}>{dateString}</span>
          </div>
        </div>
      </FullScreenModal>
    );
  }
});

CreateExpenseModal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  onCreateExpense: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
  persons: React.PropTypes.array.isRequired,
  updateState: React.PropTypes.func,
  editState: React.PropTypes.shape({
    subject: React.PropTypes.string.isRequired,
    amount: React.PropTypes.number.isRequired,
    creationDate: React.PropTypes.instanceOf(Date).isRequired,
    selectedPersons: React.PropTypes.array.isRequired,
    paidByPerson: React.PropTypes.string.isRequired,
  })
};

export default CreateExpenseModal
