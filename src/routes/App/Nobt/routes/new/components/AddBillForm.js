import React from "react";
import Input from "react-toolbox/lib/input";
import { IconButton } from "react-toolbox/lib/button";
import Visibility from "../../../../../../const/Visibility";
import SplitStrategyNames from "../../../../../../const/SplitStrategyNames";
import AmountInput from "./AmountInput";
import ChangeModeButton from "./ChangeModeButton";
import styles from "./AddBillForm.scss";
import inputTheme from "./InputTheme.scss";
import headerButtonTheme from "./HeaderButtonTheme.scss";
import { ShareList, EqualShareListItem, CustomShareListItem, PercentalShareListItem } from "./ShareList";
import AddMember from "./AddMember";
import { Link } from "react-router";
import LocationBuilder from "../../../modules/navigation/LocationBuilder";

export const AddBillForm = React.createClass({

  /* TODO:
   * - Re-implement "error"-message as soon as the user fails to split the bill properly.
   */
  getInitialState() { return {splitStrategySelectorOverlayVisibility: Visibility.HIDDEN} },

  closeSplitStrategySelectorOverlay() { this.setState({splitStrategySelectorOverlayVisibility: Visibility.HIDDEN}) },
  openSplitStrategySelectorOverlay() { this.setState({splitStrategySelectorOverlayVisibility: Visibility.VISIBLE}) },


  handleOnSubmit() {
    var billToAdd = {
      name: this.props.description,
      debtee: this.props.debtee,
      splitStrategy: this.props.splitStrategy,
      date: new Date(),
      shares: this.props.shares
        .filter(share => share.amount !== null)
        .map(share => {
          return {
            debtor: share.name,
            amount: share.amount
          }
        })
    };

    this.props.onSubmit(billToAdd);
  },

  handleOnSplitStrategyChanged(splitStrategy) {
    this.props.onSplitStrategyChange(splitStrategy);
    this.closeSplitStrategySelectorOverlay();
  },

  handleOnEqualSplitStrategySelected() { this.handleOnSplitStrategyChanged(SplitStrategyNames.EQUAL); },
  handleOnCustomSplitStrategySelected() { this.handleOnSplitStrategyChanged(SplitStrategyNames.UNEQUAL); },
  handleOnPercentalSplitStrategySelected() { this.handleOnSplitStrategyChanged(SplitStrategyNames.PERCENTAGE); },

  render() {

    return (
      <div className={styles.form}>
        <div className={styles.header}>
          <IconButton icon="close" onClick={this.props.onCancel} theme={headerButtonTheme} />
          <span>ADD A BILL</span>
          <IconButton icon="done" onClick={this.handleOnSubmit} theme={headerButtonTheme} />
        </div>

        <div className={styles.container}>
          <div className={`${styles.row} ${styles.borderd}`}>
            <Input theme={inputTheme} icon="description" placeholder="Description" value={this.props.description}
                   onChange={this.props.onDescriptionChange} />
          </div>
          <div className={`${styles.row} ${styles.borderd}`}>

            <Link to={{
              pathname: LocationBuilder.fromWindow().push("selectDebtee").path,
              state: {
                debtee: this.props.debtee,
                names: this.props.members
              }
            }}>
              <Input /* TODO: Using input is just a hack for the moment, remove later */
                readOnly theme={inputTheme} icon="person" placeholder="Who paid?" value={this.props.debtee || ""}>
                <div className={styles.overlayToAvoidKeyboardPopingUp}></div>
              </Input>
            </Link>

          </div>
          <div className={styles.row }>
            <AmountInput value={this.props.amount} onChange={this.props.onAmountChange} />
          </div>
        </div>

        <div className={styles.shareListHeader}>
          <div className={styles.title}>who's in?</div>
          <ChangeModeButton />
        </div>

        <div className={`${styles.container} ${styles.shareListContainer}`}>
          {this.props.splitStrategy === SplitStrategyNames.EQUAL && (
            <ShareList shares={this.props.shares} renderShareListItem={(share) => (
              <EqualShareListItem key={share.name} share={share} onCheckboxChange={this.props.onShareValueChange} />
            )}
            />
          )}
          {this.props.splitStrategy === SplitStrategyNames.UNEQUAL && (
            <ShareList shares={this.props.shares} renderShareListItem={(share) => (
              <CustomShareListItem key={share.name} share={share} onAmountChange={this.props.onShareValueChange} />
            )}
            />
          )}
          {this.props.splitStrategy === SplitStrategyNames.PERCENTAGE && (
            <ShareList shares={this.props.shares} renderShareListItem={(share) => (
              <PercentalShareListItem key={share.name} share={share} onPercentageChange={this.props.onShareValueChange} />
            )}
            />
          )}
          <AddMember members={this.props.members} onNewMember={this.props.onNewMember} />
        </div>

      </div>
    )
  }
});

export default AddBillForm;

AddBillForm.propTypes = {
  onCancel: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  canSubmit: React.PropTypes.bool.isRequired,
  onDescriptionChange: React.PropTypes.func.isRequired,
  onAmountChange: React.PropTypes.func.isRequired,
  onDebteeChange: React.PropTypes.func.isRequired,
  onNewMember: React.PropTypes.func.isRequired,
  onSplitStrategyChange: React.PropTypes.func.isRequired,
  onShareValueChange: React.PropTypes.func.isRequired,
  description: React.PropTypes.string.isRequired,
  debtee: React.PropTypes.string,
  splitStrategy: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired,
  members: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  shares: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      amount: React.PropTypes.number,
      value: React.PropTypes.any.isRequired,
    })
  )
};
