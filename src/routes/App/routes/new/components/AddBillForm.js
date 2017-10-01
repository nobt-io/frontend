import React from "react";
import Input from "react-toolbox/lib/input";
import { IconButton } from "react-toolbox/lib/button";
import SplitStrategyNames from "const/SplitStrategyNames";
import styles from "./AddBillForm.scss";
import InputTheme from "./InputTheme.scss";
import MoneyInputTheme from "./MoneyInputTheme.scss";
import headerButtonTheme from "./HeaderButtonTheme.scss";
import { CustomShareListItem, EqualShareListItem, PercentalShareListItem } from "./ShareList";
import HOList from "containers/HOList";
import AddMember from "./AddMember";
import AddBillProgressBarTheme from "./AddBillProgressBarTheme.scss"
import { Link } from "react-router";
import LocationBuilder from "../../../modules/navigation/LocationBuilder";
import AsyncActionStatus from "../../../../../const/AsyncActionStatus";
import { Snackbar } from "react-toolbox";
import { ProgressBar } from "react-toolbox/lib/progress_bar/index";
import DecimalNumberInput from "components/DecimalNumberInput";
import classnames from "classnames";
import merge from "../../../../../styles/merge";

/*
 TODO:
 * - Re-implement "error"-message as soon as the user fails to split the bill properly.
 */
export default class AddBillForm extends React.Component {

  constructor(props) {
    super(props)
    props.clearAddBillForm()
  }

  handleOnSubmit = () => {
    let billToAdd = {
      name: this.props.description,
      debtee: this.props.debtee,
      splitStrategy: this.props.splitStrategy,
      date: new Date(), // TODO: Add DatePicker
      shares: this.props.shares
        .filter(share => share.amount !== null)
        .map(share => {
          return {
            debtor: share.name,
            amount: share.amount
          }
        })
    };

    this.props.onSubmit(this.props.nobtId, billToAdd);
  };

  componentWillReceiveProps(nextProps) {
    let newStatus = nextProps.addBillStatus;

    if (newStatus === AsyncActionStatus.SUCCESSFUL) {
      this.props.replace(LocationBuilder.fromWindow().pop(1).path);
      this.props.invalidateNobt()
    }
  }

  render = () => {

    let { addBillStatus, description, debtee, amount } = this.props;

    let addBillFailed = addBillStatus === AsyncActionStatus.FAILED;
    let addBillInProgress = addBillStatus === AsyncActionStatus.IN_PROGRESS;

    return (
      <div>
        <div className={styles.form}>
          <fieldset disabled={addBillInProgress}>
            <div className={styles.headerContainer}>
              <div className={styles.header}>
                <IconButton icon="close" onClick={this.props.onCancel} theme={headerButtonTheme} />
                <span>ADD A BILL</span>
                {!addBillInProgress && <IconButton icon="done" onClick={this.handleOnSubmit} theme={headerButtonTheme} />}
                {addBillInProgress && <ProgressBar theme={AddBillProgressBarTheme} type="circular" />}
              </div>
            </div>

            <div className={styles.container}>
              <div className={`${styles.row} ${styles.borderd}`}>
                <Input theme={InputTheme}
                       icon="description"
                       placeholder="Name"
                       value={description}
                       onChange={this.props.onDescriptionChanged}
                       required={addBillFailed}
                       error={addBillFailed && !description && "Bills must have a name."}
                />
              </div>
              <div className={`${styles.row} ${styles.borderd}`}>

                <Link
                  to={LocationBuilder.fromWindow().push("selectDebtee").path}
                  onClick={(e) => {
                    if (addBillInProgress) {
                      e.preventDefault()
                    }
                  }}>
                  <Input /* TODO: Using input is just a hack for the moment, remove later and style accordingly */
                    theme={InputTheme}
                    icon="person"
                    placeholder="Who paid?"
                    value={debtee}
                    required={addBillFailed}
                    error={addBillFailed && !debtee && "Selecting a debtee is mandatory."}
                  >
                    <div className={styles.overlayToAvoidKeyboardPopingUp} />
                  </Input>
                </Link>

              </div>
              <div className={classnames(styles.row, styles.moneyInputContainer)}>
                <div className={styles.currencyTag}>
                  <span>EUR</span>
                </div>
                <div className={styles.moneyInput}>
                  <DecimalNumberInput
                    required={addBillFailed}
                    theme={merge(InputTheme, MoneyInputTheme)}
                    value={amount}
                    error={addBillFailed && !amount && "The bill's total is required."}
                    onChange={this.props.onAmountChanged}/>
                </div>
              </div>
            </div>

            <div className={styles.shareListHeader}>
              <div className={styles.title}>who's in?</div>
            </div>

            <div className={`${styles.container} ${styles.shareListContainer}`}>
              <HOList
                items={this.props.shares}
                renderItem={share => {
                  switch (this.props.splitStrategy) {
                    case SplitStrategyNames.EQUAL:
                      return <EqualShareListItem key={share.name} share={share} onCheckboxChange={this.props.onShareValueChanged} />;

                    case SplitStrategyNames.UNEQUAL:
                      return <CustomShareListItem key={share.name} share={share} onAmountChange={this.props.onShareValueChanged} />;

                    case SplitStrategyNames.PERCENTAGE:
                      return <PercentalShareListItem key={share.name} share={share} onPercentageChange={this.props.onShareValueChanged} />;
                  }
                }}
              />
              <AddMember onNewMember={this.props.onNewMember} />
            </div>

          </fieldset>
        </div>

        {this.props.children}

        <Snackbar
          action='Retry?'
          active={this.props.addBillStatus === AsyncActionStatus.FAILED}
          label='Failed to add bill.'
          type='warning'
          onClick={this.handleOnSubmit}
        />
      </div>
    )
  }
}

AddBillForm.propTypes = {
  onCancel: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  canSubmit: React.PropTypes.bool.isRequired,
  onDescriptionChanged: React.PropTypes.func.isRequired,
  onAmountChanged: React.PropTypes.func.isRequired,
  onSplitStrategyChanged: React.PropTypes.func.isRequired,
  onShareValueChanged: React.PropTypes.func.isRequired,
  description: React.PropTypes.string.isRequired,
  debtee: React.PropTypes.string,
  splitStrategy: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired,
  shares: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      amount: React.PropTypes.number,
      value: React.PropTypes.any.isRequired,
    })
  )
};
