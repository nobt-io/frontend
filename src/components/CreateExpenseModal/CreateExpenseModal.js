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

const splitStrategyNames = {
  EQUAL: 'EQUAL',
  UNEQUAL: 'UNEQUAL',
  PERCENTAGE: 'PERCENTAGE'
};

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

    refreshStore: function (objectToUpdate) {
      this.props.updateState({...this.props.editState, ...objectToUpdate});
    },

    refreshState: function (objectToUpdate) {
      this.setState({...this.state, ...objectToUpdate});
    },

    render: function () {

      const {personModalIsActive, dateModalIsActive, shareModalIsActive} =
      this.state || {personModalIsActive: false, dateModalIsActive: false, shareModalIsActive: false};

      const {creationDate, amount, selectedPersons, paidByPerson, subject, splitStrategy} = this.props.editState;
      const {onClose, onCreateExpense, active, persons} = this.props;

      const dateString =
        new Date().toDateString() === new Date(creationDate).toDateString()
          ? "Today" : "on " + this.formatDate(new Date(creationDate));

      var expenseIsValid = subject.length > 0 && amount > 0;

      var splitByLabel = {
        [splitStrategyNames.EQUAL]: <span>split<br/><b>equally</b></span>,
        [splitStrategyNames.UNEQUAL]: <span>split<br/><b>unequally</b></span>,
        [splitStrategyNames.PERCENTAGE]: <span>split by<br/><b>percentage</b></span>
      }[splitStrategy];

      return (
        <FullScreenModal active={active} onClose={onClose}>
          <PersonSelectorModal
            title={"Who paid?"} canInsertPerson={true} persons={persons}
            active={personModalIsActive} onClose={() => this.refreshState({personModalIsActive: false})}
            onFilterChange={(paidByPerson) => this.refreshStore({paidByPerson})}
          />
          <DatePickerModal
            title={"When?"} active={dateModalIsActive} onClose={() => this.refreshState({dateModalIsActive: false})}
            onDateChange={(creationDate) => this.refreshStore({creationDate})}
          />
          <ListSelectModal
            active={shareModalIsActive} onSortChange={(splitStrategy) => this.refreshStore({splitStrategy})}
            title={"Split by"} onClose={() => this.refreshState({shareModalIsActive: false})}
            list={[
              {name: splitStrategyNames.EQUAL, icon: "view_module", displayName: "split equally"},
              {name: splitStrategyNames.UNEQUAL, icon: "view_quilt", displayName: "split unequally"},
              {name: splitStrategyNames.PERCENTAGE, icon: "poll", displayName: "split by percentage"}
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
                     onChange={(subject) => this.refreshStore({subject})}/>
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
            <CurrencyInput onChange={(amount) => this.refreshStore({amount})} className={styles.amountInput}/>
          </div>
          <div className={styles.splitContainer}>
            <AmountEqualSplitPersonList
              persons={persons}
              selectedPersons={selectedPersons}
              amount={amount}
              onSelectedPersonsChanged={(selectedPersons) => this.refreshStore({selectedPersons})}
            />
          </div>
        </FullScreenModal>
      );
    }
  })
  ;

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
    splitStrategy: React.PropTypes.oneOf([splitStrategyNames.PERCENTAGE, splitStrategyNames.UNEQUAL, splitStrategyNames.EQUAL])
  })
};

export default CreateExpenseModal
