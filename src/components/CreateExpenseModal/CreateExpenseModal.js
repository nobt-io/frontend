import React from 'react'
import styles from './CreateExpenseModal.scss'
import { FullScreenModal } from "components/Modal";
import Header from "components/Header";
import { Avatar } from "components/Avatar";
import { AmountEqualSplitPersonList, AmountUnequalSplitPersonList, AmountPercentageSplitPersonList } from "components/AmountSplitPersonList";
import CurrencyInput from "components/CurrencyInput";
import Input from "react-toolbox/lib/input";
import PersonSelectorModal from "components/PersonSelectorModal";
import DatePickerModal from "components/DatePickerModal";
import ListSelectModal from "components/ListSelectModal";
import SplitStrategyNames from "const/SplitStrategyNames";
import _debug from "debug";

const logger = _debug("createExpense");

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

    setMetaData: function (metaData) { this.props.setMetaData({...this.props.metaData, ...metaData}); },

    setPersonValue: function (name, value) { this.props.setPersonValue(name, value); },

    setModalState: function (state) { this.setState({...this.state, ...state}); },

    createExpense: function () {

      var expenseToCreate = {
        name: this.props.metaData.subject,
        debtee: this.props.metaData.paidByPerson,
        date: this.props.metaData.creationDate,
        splitStrategy: this.props.metaData.splitStrategy,
        shares: this.props.personData.involvedPersons.map(p => ({debtor: p.name, amount: p.amount}))
      };

      this.props.createExpense(expenseToCreate).then((response) => {
        this.props.reloadNobt();
      }, () => {
        //Todo: show error!
      });
    },

    render: function () {

      const {personModalIsActive, dateModalIsActive, shareModalIsActive} =
      this.state || {personModalIsActive: false, dateModalIsActive: false, shareModalIsActive: false};

      const {metaDataIsValid, active, subject, creationDate, amount, paidByPerson, splitStrategy} = this.props.metaData;
      const {involvedPersonsAreValid, involvedPersonsCalculationInfo, involvedPersons} = this.props.personData;
      const {nobtMembers} = this.props;

      const expenseIsValid = involvedPersonsAreValid && metaDataIsValid;

      const dateString =
        new Date().toDateString() === new Date(creationDate).toDateString()
          ? "Today" : "on " + this.formatDate(new Date(creationDate));

      var splitByLabel = {
        [SplitStrategyNames.EQUAL]: <span>split<br /><b>equally</b></span>,
        [SplitStrategyNames.UNEQUAL]: <span>split<br /><b>unequally</b></span>,
        [SplitStrategyNames.PERCENTAGE]: <span>split by<br /><b>percentage</b></span>
      }[ splitStrategy ];

      var amountSplitPersonList;

      switch (splitStrategy) {
        case SplitStrategyNames.EQUAL: {
          amountSplitPersonList =
            <AmountEqualSplitPersonList nobtMembers={nobtMembers} involvedPersons={involvedPersons} involvedPersonsAreValid={involvedPersonsAreValid}
                                        setPersonValue={this.setPersonValue} involvedPersonsCalculationInfo={involvedPersonsCalculationInfo} />;
          break;
        }
        case SplitStrategyNames.PERCENTAGE: {
          amountSplitPersonList =
            <AmountPercentageSplitPersonList nobtMembers={nobtMembers} involvedPersons={involvedPersons}
                                             involvedPersonsAreValid={involvedPersonsAreValid}
                                             setPersonValue={this.setPersonValue} involvedPersonsCalculationInfo={involvedPersonsCalculationInfo} />;
          break;
        }
        case SplitStrategyNames.UNEQUAL: {
          amountSplitPersonList =
            <AmountUnequalSplitPersonList nobtMembers={nobtMembers} involvedPersons={involvedPersons}
                                          involvedPersonsAreValid={involvedPersonsAreValid}
                                          setPersonValue={this.setPersonValue} involvedPersonsCalculationInfo={involvedPersonsCalculationInfo} />;
          break;
        }
      }

      return (
        <FullScreenModal active={active} onClose={() => this.props.onClose()}>
          <PersonSelectorModal
            title={"Who paid?"} canInsertPerson={true} names={nobtMembers}
            active={personModalIsActive || false} onClose={() => this.setModalState({personModalIsActive: false})}
            onFilterChange={(paidByPerson) => this.setMetaData({paidByPerson})}
          />
          <DatePickerModal
            title={"When?"} active={dateModalIsActive || false}
            onClose={() => this.setModalState({dateModalIsActive: false})}
            onDateChange={(creationDate) => this.setMetaData({creationDate})}
          />
          <ListSelectModal
            active={shareModalIsActive || false} onSortChange={(splitStrategy) => this.setMetaData({splitStrategy})}
            title={"Split by"} onClose={() => this.setModalState({shareModalIsActive: false})}
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
              onClick: () => this.createExpense(),
              title: "Create expense"
            }}
            leftButton={{icon: "arrow_back", onClick: () => this.props.onClose(), title: "Back"}}
          />
          <div className={styles.headInput}>
            <div>
              <Input placeholder="What was bought?" value={subject} className={styles.subjectInput}
                     onChange={(subject) => this.setMetaData({subject})} />
            </div>
            <div>
              <span onClick={() => this.setModalState({personModalIsActive: true})}
                    className={styles.personPicker}>by {paidByPerson}
                <Avatar size={20} fontSize={11} name={paidByPerson} />
              </span>
              <span onClick={() => this.setModalState({dateModalIsActive: true})}
                    className={styles.datePicker}>{dateString}</span>
            </div>
          </div>
          <div className={styles.amountContainer}>
            <span onClick={() => this.setModalState({shareModalIsActive: true})}
                  className={styles.spit}>{splitByLabel}</span>
            <span className={styles.currencySymbold}>€</span>
            <CurrencyInput onChange={(amount) => this.setMetaData({amount})} value={amount}
                           className={styles.amountInput} />
          </div>
          <div className={styles.splitContainer}>
            {amountSplitPersonList}
          </div>
        </FullScreenModal>

      );
    }
  })
  ;

CreateExpenseModal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  createExpense: React.PropTypes.func.isRequired,
  reloadNobt: React.PropTypes.func.isRequired,
  nobtMembers: React.PropTypes.array.isRequired,
  setMetaData: React.PropTypes.func,
  setPersonValue: React.PropTypes.func,

  metaData: React.PropTypes.shape({
    metaDataIsValid: React.PropTypes.bool.isRequired,
    active: React.PropTypes.bool.isRequired,
    subject: React.PropTypes.string.isRequired,
    amount: React.PropTypes.number.isRequired,
    creationDate: React.PropTypes.instanceOf(Date).isRequired,
    paidByPerson: React.PropTypes.string.isRequired,
    splitStrategy: React.PropTypes.oneOf([ SplitStrategyNames.PERCENTAGE, SplitStrategyNames.UNEQUAL, SplitStrategyNames.EQUAL ]),
  }),
  personData: React.PropTypes.shape({
    involvedPersons: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        value: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        amount: React.PropTypes.number.isRequired,
      }),
    ),
    involvedPersonsCalculationInfo: React.PropTypes.object.isRequired,
    involvedPersonsAreValid: React.PropTypes.bool.isRequired,
  })
};

export default CreateExpenseModal
