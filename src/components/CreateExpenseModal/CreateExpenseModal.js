import React from 'react'
import styles from './CreateExpenseModal.scss'
import { FullScreenModal } from "components/Modal";
import Header from "components/Header";
import Avatar from "components/Avatar";
import { AmountEqualSplitPersonList } from "components/AmountSplitPersonList";
import CurrencyInput from "components/CurrencyInput";
import Input from "react-toolbox/lib/input";
import PersonSelectorModal from "components/PersonSelectorModal";
import DatePickerModal from "components/DatePickerModal";
import ListSelectModal from "components/ListSelectModal";
import SplitStrategyNames from "const/SplitStrategyNames";

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

  setExpenseState: function (stateObjectToUpdate) {
    this.props.updateState({...this.props.state, ...stateObjectToUpdate});
  },

  setSelectedPersons: function (splitStrategy, selectedPersons) {
    this.props.updateState(
      {
        ...this.props.state,
        selectedPersons: {...this.props.state.selectedPersons, [splitStrategy]: selectedPersons}
      });
  },

  refreshState: function (objectToUpdate) {
    this.setState({...this.state, ...objectToUpdate});
  },


  render: function () {

    const {personModalIsActive, dateModalIsActive, shareModalIsActive} =
    this.state || {personModalIsActive: false, dateModalIsActive: false, shareModalIsActive: false};

    const {creationDate, amount, active, paidByPerson, subject, splitStrategy} = this.props.state;
    const {selectedAmount, selectedPersons} = this.props.selection;
    const {onClose, onCreateExpense, persons, addOrUpdateSelectedPerson, removeSelectedPerson} = this.props;

    const dateString =
      new Date().toDateString() === new Date(creationDate).toDateString()
        ? "Today" : "on " + this.formatDate(new Date(creationDate));

    var expenseIsValid =
      subject.length > 0
      && amount > 0
      && amount == selectedAmount;

    var splitByLabel = {
      [SplitStrategyNames.EQUAL]: <span>split<br/><b>equally</b></span>,
      [SplitStrategyNames.UNEQUAL]: <span>split<br/><b>unequally</b></span>,
      [SplitStrategyNames.PERCENTAGE]: <span>split by<br/><b>percentage</b></span>
    }[ splitStrategy ];

    var amountSplitPersonList = {
      [SplitStrategyNames.EQUAL]: (<AmountEqualSplitPersonList persons={persons}
                                                               selectedPersons={selectedPersons}
                                                               amount={amount}
                                                               selectedAmount={selectedAmount}
                                                               addOrUpdateSelectedPerson={(p) => addOrUpdateSelectedPerson(p)}
                                                               removeSelectedPerson={(name) => removeSelectedPerson(name)} />),
      [SplitStrategyNames.PERCENTAGE]: (<div>WIP</div>),
      [SplitStrategyNames.EQUAL]: (<AmountEqualSplitPersonList persons={persons}
                                                               selectedPersons={selectedPersons}
                                                               amount={amount}
                                                               selectedAmount={selectedAmount}
                                                               addOrUpdateSelectedPerson={(p) => addOrUpdateSelectedPerson(p)}
                                                               removeSelectedPerson={(name) => removeSelectedPerson(name)} />),
    }[ splitStrategy ];

    return (
      <FullScreenModal active={active} onClose={onClose}>
        <PersonSelectorModal
          title={"Who paid?"} canInsertPerson={true} names={persons}
          active={personModalIsActive || false} onClose={() => this.refreshState({personModalIsActive: false})}
          onFilterChange={(paidByPerson) => this.setExpenseState({paidByPerson})}
        />
        <DatePickerModal
          title={"When?"} active={dateModalIsActive || false}
          onClose={() => this.refreshState({dateModalIsActive: false})}
          onDateChange={(creationDate) => this.setExpenseState({creationDate})}
        />
        <ListSelectModal
          active={shareModalIsActive || false} onSortChange={(splitStrategy) => this.setExpenseState({splitStrategy})}
          title={"Split by"} onClose={() => this.refreshState({shareModalIsActive: false})}
          list={[
            {name: SplitStrategyNames.EQUAL, icon: "view_module", displayName: "split equally"},
            {name: SplitStrategyNames.UNEQUAL, icon: "view_quilt", displayName: "split unequally"},
            {name: SplitStrategyNames.PERCENTAGE, icon: "poll", displayName: "split by percentage"}
          ]}
        />
        <Header
          showNobtHeader={false}
          rightButton={!expenseIsValid ? null : {
            icon: "check_box",
            onClick: () => onCreateExpense(),
            title: "Create expense"
          }}
          leftButton={{icon: "arrow_back", onClick: () => onClose(), title: "Back"}}/>
        <div className={styles.headInput}>
          <div>
            <Input placeholder="What was bought?" value={subject} className={styles.subjectInput}
                   onChange={(subject) => this.setExpenseState({subject})}/>
          </div>
          <div>
              <span onClick={() => this.refreshState({personModalIsActive: true})}
                    className={styles.personPicker}>by {paidByPerson}
                <Avatar size={20} fontSize={11} name={paidByPerson}/>
              </span>
            <span onClick={() => this.refreshState({dateModalIsActive: true})}
                  className={styles.datePicker}>{dateString}</span>
          </div>
        </div>
        <div className={styles.amountContainer}>
            <span onClick={() => this.refreshState({shareModalIsActive: true})}
                  className={styles.spit}>{splitByLabel}</span>
          <span className={styles.currencySymbold}>€</span>
          <CurrencyInput onChange={(amount) => this.setExpenseState({amount})} value={amount}
                         className={styles.amountInput}/>
        </div>
        <div className={styles.splitContainer}>
          {amountSplitPersonList}
        </div>
      </FullScreenModal>

    );
  }
});

CreateExpenseModal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  onCreateExpense: React.PropTypes.func.isRequired,
  persons: React.PropTypes.array.isRequired,
  updateState: React.PropTypes.func,
  addOrUpdateSelectedPerson: React.PropTypes.func,
  removeSelectedPerson: React.PropTypes.func,

  state: React.PropTypes.shape({
    active: React.PropTypes.bool.isRequired,
    subject: React.PropTypes.string.isRequired,
    amount: React.PropTypes.number.isRequired,
    creationDate: React.PropTypes.instanceOf(Date).isRequired,
    paidByPerson: React.PropTypes.string.isRequired,
    splitStrategy: React.PropTypes.oneOf([ SplitStrategyNames.PERCENTAGE, SplitStrategyNames.UNEQUAL, SplitStrategyNames.EQUAL ]),
  }),
  selection: React.PropTypes.shape({
    selectedPersons: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        value: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        amount: React.PropTypes.number.isRequired,
      }),
    ),
    selectedAmount: React.PropTypes.number.isRequired,
  })
};

export default CreateExpenseModal
