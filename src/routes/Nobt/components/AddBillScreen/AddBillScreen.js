import React from "react";
import Input from "react-toolbox/lib/input";
import { Button } from "react-toolbox/lib/button";
import { FormattedDate } from "react-intl";
import AppBar from "react-toolbox/lib/app_bar";
import {List, ListItem} from "react-toolbox/lib/list"

import _debug from "debug";

import styles from "./AddBillScreen.scss";

import Header from "components/Header";
import { Avatar } from "components/Avatar";
import { AmountEqualSplitPersonList, AmountUnequalSplitPersonList, AmountPercentageSplitPersonList } from "components/AmountSplitPersonList";
import CurrencyInput from "components/CurrencyInput";

import PersonPicker from "components/PersonPicker";

import SingleInputInlineForm from "components/SingleInputInlineForm"
import QuickDatePicker from "components/QuickDatePicker";
import CloseButton from "components/CloseButton"

import Overlay from "components/Overlay/Overlay"

import SplitStrategyNames from "const/SplitStrategyNames";
import Visibility from "const/Visibility"


const logger = _debug("view:components:AddBillScreen");

const isToday = (date) => new Date(date).toDateString() === new Date().toDateString();


// TODO disable screen while bill is creating

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

      this.props.addBill(billToCreate);
    },

    closeDatePickerOverlay() { this.setState({ datePickerOverlayVisibility: Visibility.HIDDEN }) },
    openDatePickerOverlay() { this.setState({ datePickerOverlayVisibility: Visibility.VISIBLE }) },

    closeDebteeSelectorOverlay() { this.setState({ debteeSelectorOverlayVisibility: Visibility.HIDDEN }) },
    openDebteeSelectorOverlay() { this.setState({ debteeSelectorOverlayVisibility: Visibility.VISIBLE }) },

    closeSplitStrategySelectorOverlay() { this.setState({ splitStrategySelectorOverlayVisibility: Visibility.HIDDEN }) },
    openSplitStrategySelectorOverlay() { this.setState({ splitStrategySelectorOverlayVisibility: Visibility.VISIBLE }) },

    getInitialState() {
      return {
        datePickerOverlayVisibility: Visibility.HIDDEN,
        debteeSelectorOverlayVisibility: Visibility.HIDDEN,
        splitStrategySelectorOverlayVisibility: Visibility.HIDDEN
      };
    },

    handleOnSplitStrategySelected(event) {
      console.log(event)
      this.closeSplitStrategySelectorOverlay()
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
        <div>
          <Overlay visibility={this.state.debteeSelectorOverlayVisibility} onClickOutside={this.closeDebteeSelectorOverlay}>
            <Header
              left={<h1>Who paid?</h1>}
              right={<CloseButton onClick={this.closeDebteeSelectorOverlay}/>}
            />
            <PersonPicker names={nobtMembers} onPersonPicked={ (name) => {
              // this.setMetaData({name});
              this.closeDebteeSelectorOverlay()
            }}/>
            <SingleInputInlineForm buttonIcon="person_add" placeholder="Someone else?" onSubmit={(p) => onItemClick(p)}/>
          </Overlay>

          <Overlay visibility={this.state.datePickerOverlayVisibility} onClickOutside={this.closeDatePickerOverlay}>
            <Header
              left={<h1>When?</h1>}
              right={<CloseButton onClick={ this.closeDatePickerOverlay }/>}
            />
            <QuickDatePicker onDatePicked={(date) => {
              // this.setMetaData({date});
              this.closeDatePickerOverlay()
            }}/>
          </Overlay>

          <Overlay visibility={this.state.splitStrategySelectorOverlayVisibility} onClickOutside={this.closeSplitStrategySelectorOverlay}>
            <Header
              left={<h3>Split by</h3>}
              right={<CloseButton onClick={this.closeSplitStrategySelectorOverlay} />}
            />
            <List selectable ripple>
              <ListItem key="EQUAL" onClick={() => this.handleOnSplitStrategySelected(SplitStrategyNames.EQUAL)} caption="split equally" leftIcon="view_module" />
              <ListItem key="UNEQUAL" onClick={() => this.handleOnSplitStrategySelected(SplitStrategyNames.UNEQUAL)} caption="split unequally" leftIcon="view_quilt" />
              <ListItem key="PERCENTAGE" onClick={() => this.handleOnSplitStrategySelected(SplitStrategyNames.PERCENTAGE)} caption="split by percentage" leftIcon="poll" />
            </List>
          </Overlay>

          <AppBar>
            <Header
              left={<Button icon="arrow_back" onClick={this.props.onClose} theme={ { button: styles.headerButton } }>Back</Button>}
              right={<Button icon="check_box" onClick={this.addBill} disabled={!billIsValid} theme={ { button: styles.headerButton} }>Add bill</Button>}
            />
          </AppBar>
          <div className={styles.headInput}>
            <div>
              <Input placeholder="What was bought?" value={subject} className={styles.subjectInput}
                     onChange={(subject) => this.setMetaData({subject})} />
            </div>
            <div>
              <span onClick={this.openDebteeSelectorOverlay}
                    className={styles.personPicker}>by {paidByPerson}
                <Avatar size={20} fontSize={11} name={paidByPerson} />
              </span>

              {isToday(creationDate) &&
              <span onClick={this.openDatePickerOverlay} className={styles.datePicker}>Today</span>
              }

              {!isToday(creationDate) &&
              <span onClick={this.openDatePickerOverlay} className={styles.datePicker}>
                  <FormattedDate value={new Date(creationDate)} year='numeric' month='numeric' day='numeric' />
                </span>
              }

            </div>
          </div>
          <div className={styles.amountContainer}>

            <span onClick={this.openSplitStrategySelectorOverlay} className={styles.spit}>{splitByLabel}</span>


            <span className={styles.currencySymbold}>€</span>
            <CurrencyInput onChange={(amount) => this.setMetaData({amount})} value={amount} className={styles.amountInput} />
          </div>
          <div className={styles.splitContainer}>
            {amountSplitPersonList}
          </div>
        </div>
      );
    }
  })
  ;

NewBillOverlay.propTypes = {
  // TODO rename to onBack
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
