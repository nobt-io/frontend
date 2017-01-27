import React from "react";
import Input from "react-toolbox/lib/input";
import { IconButton } from "react-toolbox/lib/button";
import SplitStrategyNames from "const/SplitStrategyNames";
import AmountInput from "./AmountInput";
import ChangeModeButton from "./ChangeModeButton";
import styles from "./AddBillForm.scss";
import inputTheme from "./InputTheme.scss";
import headerButtonTheme from "./HeaderButtonTheme.scss";
import { ShareList, EqualShareListItem, CustomShareListItem, PercentalShareListItem } from "./ShareList";
import AddMember from "./AddMember";
import { Link } from "react-router";
import LocationBuilder from "../../../modules/navigation/LocationBuilder";

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

  handleOnSplitStrategyChanged = (splitStrategy) => {
    this.props.onSplitStrategyChanged(splitStrategy);
    this.closeSplitStrategySelectorOverlay();
  };

  handleOnEqualSplitStrategySelected = () => { this.handleOnSplitStrategyChanged(SplitStrategyNames.EQUAL); }
  handleOnCustomSplitStrategySelected = () => { this.handleOnSplitStrategyChanged(SplitStrategyNames.UNEQUAL); }
  handleOnPercentalSplitStrategySelected = () => { this.handleOnSplitStrategyChanged(SplitStrategyNames.PERCENTAGE); }

  render = () => {

    return (
      <div>
        <div className={styles.form}>
          <div className={styles.header}>
            <IconButton icon="close" onClick={this.props.onCancel} theme={headerButtonTheme} />
            <span>ADD A BILL</span>
            <IconButton icon="done" onClick={this.handleOnSubmit} theme={headerButtonTheme} />
          </div>

          <div className={styles.container}>
            <div className={`${styles.row} ${styles.borderd}`}>
              <Input theme={inputTheme} icon="description" placeholder="Description" value={this.props.description}
                     onChange={ this.props.onDescriptionChanged }/>
            </div>
            <div className={`${styles.row} ${styles.borderd}`}>

              <Link to={LocationBuilder.fromWindow().push("selectDebtee").path}>
                <Input /* TODO: Using input is just a hack for the moment, remove later and style accordingly */
                  readOnly theme={inputTheme} icon="person" placeholder="Who paid?" value={this.props.debtee || ""}>
                  <div className={styles.overlayToAvoidKeyboardPopingUp}></div>
                </Input>
              </Link>

            </div>
            <div className={styles.row }>
              <AmountInput value={this.props.amount} onChange={this.props.onAmountChanged} />
            </div>
          </div>

          <div className={styles.shareListHeader}>
            <div className={styles.title}>who's in?</div>
            <ChangeModeButton />
          </div>

          <div className={`${styles.container} ${styles.shareListContainer}`}>
            {this.props.splitStrategy === SplitStrategyNames.EQUAL && (
              <ShareList shares={this.props.shares} renderShareListItem={(share) => (
                <EqualShareListItem key={share.name} share={share} onCheckboxChange={this.props.onShareValueChanged} />
              )}
              />
            )}
            {this.props.splitStrategy === SplitStrategyNames.UNEQUAL && (
              <ShareList shares={this.props.shares} renderShareListItem={(share) => (
                <CustomShareListItem key={share.name} share={share} onAmountChange={this.props.onShareValueChanged} />
              )}
              />
            )}
            {this.props.splitStrategy === SplitStrategyNames.PERCENTAGE && (
              <ShareList shares={this.props.shares} renderShareListItem={(share) => (
                <PercentalShareListItem key={share.name} share={share} onPercentageChange={this.props.onShareValueChanged} />
              )}
              />
            )}
            <AddMember onNewMember={this.props.onNewMember}/>
          </div>

        </div>

        {this.props.children}
      </div>
    )
  }
};

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
