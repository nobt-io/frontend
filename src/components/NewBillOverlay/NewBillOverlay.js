import React from "react";
import styles from "./NewBillOverlay.scss";
import { FullScreenOverlay } from "components/Overlay";
import Header from "components/Header";
import { Avatar } from "components/Avatar";
import { AmountEqualSplitPersonList, AmountUnequalSplitPersonList, AmountPercentageSplitPersonList } from "components/AmountSplitPersonList";
import CurrencyInput from "components/CurrencyInput";
import Input from "react-toolbox/lib/input";
import PersonSelectorOverlay from "components/PersonSelectorOverlay";
import DatePickerOverlay from "components/DatePickerOverlay";
import ListSelectOverlay from "components/ListSelectOverlay";
import SplitStrategyNames from "const/SplitStrategyNames";
import { FormattedDate } from "react-intl";
import { Button } from "react-toolbox/lib/button";
import _debug from "debug";

const logger = _debug("view:components:NewBillOverlay");

const isToday = (date) => new Date(date).toDateString() === new Date().toDateString();

export const NewBillOverlay = React.createClass({

    setMetaData: function (metaData) { this.props.setMetaData({...this.props.metaData, ...metaData}); },

    setPersonValue: function (name, value) { this.props.setPersonValue(name, value); },

    setModalState: function (state) { this.setState({...this.state, ...state}); },

    addBill: function () {

      var billToCreate = {
        name: this.props.metaData.subject,
        debtee: this.props.metaData.paidByPerson,
        date: this.props.metaData.creationDate,
        splitStrategy: this.props.metaData.splitStrategy,
        shares: this.props.personData.involvedPersons.map(p => ({debtor: p.name, amount: p.amount}))
      };

      this.props.addBill(billToCreate).then((response) => {
        this.props.reloadNobt();
        this.props.onClose();
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

      const billIsValid = involvedPersonsAreValid && metaDataIsValid;

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
        <FullScreenOverlay active={active} onClose={() => this.props.onClose()}>
          <PersonSelectorOverlay
            title={"Who paid?"} canInsertPerson={true} names={nobtMembers}
            active={personModalIsActive || false} onClose={() => this.setModalState({personModalIsActive: false})}
            onFilterChange={(paidByPerson) => this.setMetaData({paidByPerson})}
          />
          <DatePickerOverlay
            title={"When?"} active={dateModalIsActive || false}
            onClose={() => this.setModalState({dateModalIsActive: false})}
            onDateChange={(creationDate) => this.setMetaData({creationDate})}
          />
          <ListSelectOverlay
            active={shareModalIsActive || false} onSortChange={(splitStrategy) => this.setMetaData({splitStrategy})}
            title={"Split by"} onClose={() => this.setModalState({shareModalIsActive: false})}
            items={[
              {name: SplitStrategyNames.EQUAL, icon: "view_module", displayName: "split equally"},
              {name: SplitStrategyNames.UNEQUAL, icon: "view_quilt", displayName: "split unequally"},
              {name: SplitStrategyNames.PERCENTAGE, icon: "poll", displayName: "split by percentage"}
            ]}
          />
          <Header
            left={<Button icon="arrow_back" onClick={this.props.onClose}>Back</Button>}
            right={<Button icon="check_box" onClick={this.addBill} disabled={!billIsValid}>Add bill</Button>}
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

              {isToday(creationDate) &&
              <span onClick={() => this.setModalState({dateModalIsActive: true})} className={styles.datePicker}>Today</span>
              }

              {!isToday(creationDate) &&
              <span onClick={() => this.setModalState({dateModalIsActive: true})} className={styles.datePicker}>
                  <FormattedDate value={new Date(creationDate)} year='numeric' month='numeric' day='numeric' />
                </span>
              }

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
        </FullScreenOverlay>

      );
    }
  })
  ;

NewBillOverlay.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  addBill: React.PropTypes.func.isRequired,
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

export default NewBillOverlay
