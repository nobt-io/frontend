import React from "react";
import Input from "react-toolbox/lib/input";
import { Card } from "react-toolbox/lib/card";
import AppBar from "react-toolbox/lib/app_bar";
import FontIcon from "react-toolbox/lib/font_icon";
import { List, ListItem } from "react-toolbox/lib/list";
import { Button, IconButton } from "react-toolbox/lib/button";
import Header from "components/Header";
import CurrencyInput from "components/CurrencyInput";
import Overlay from "components/Overlay";
import CloseButton from "components/CloseButton";
import Visibility from "const/Visibility";
import SplitStrategyNames from "const/SplitStrategyNames";
import DebteePicker from "./DebteePicker";
import styles from "./AddBillForm.scss";
import { ShareList, EqualShareListItem, CustomShareListItem, PercentalShareListItem } from "./ShareList";

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
      shares: this.props.shares.map(share => {
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
        <AppBar>
          <Header
            left={<IconButton icon="close" onClick={this.props.onCancel} theme={{icon: styles.cancelButton}} />}
            right={<Button icon="done" onClick={this.handleOnSubmit} theme={{button: styles.addBillButton}}>Save</Button>}
          />
        </AppBar>

        <h3 className={styles.heading}>Add a new bill</h3>

        <div className={styles.billMetaInfoContainer}>

          <Card className={styles.billMetaInfoInputContainer} theme={{card: styles.billMetaInfoCard}}>
            <div className={styles.row}>
              <div className={`${styles.formElement} ${styles.descriptionInputContainer}`}>
                <FontIcon className={styles.icon} value="description" />
                <Input placeholder="What was bought?" value={this.props.description} onChange={this.props.onDescriptionChange} />
              </div>
            </div>

            <div className={styles.row}>

              <div className={`${styles.amountInputContainer} ${styles.formElement}`}>
                <div className={styles.iconContainer}>
                  <FontIcon className={`${styles.currencySymbol} ${styles.icon}`} children="€" />
                </div>

                <CurrencyInput onChange={this.props.onAmountChange} value={this.props.amount} />
              </div>

              <DebteePicker
                value={this.props.debtee}
                className={`${styles.formElement} ${styles.debteePicker}`}
                names={this.props.members}
                onDebteePicked={ this.props.onDebteeChange }
              />

            </div>
          </Card>
        </div>

        <div className={styles.billSplitInfoContainer}>

          <Header
            theme={{
              header: styles.billSplitHeader
            }}
            left={
              <div className={styles.whoIsInContainer}>
                <FontIcon value="group" />
                <h4>&nbsp;Who's in?</h4>
              </div>
            }
            right={<IconButton icon="settings" neutral={false} onClick={this.openSplitStrategySelectorOverlay} />}
          />

          <Overlay visibility={this.state.splitStrategySelectorOverlayVisibility} onClickOutside={this.closeSplitStrategySelectorOverlay}>
            <Header
              left={<h3>Split bill into</h3>}
              right={<CloseButton onClick={this.closeSplitStrategySelectorOverlay} />}
            />
            <List selectable ripple>
              <ListItem key="EQUAL" onClick={this.handleOnEqualSplitStrategySelected} caption="equal shares" leftIcon="view_module" />
              <ListItem key="UNEQUAL" onClick={this.handleOnCustomSplitStrategySelected} caption="custom shares" leftIcon="view_quilt" />
              <ListItem key="PERCENTAGE" onClick={this.handleOnPercentalSplitStrategySelected} caption="percental shares" leftIcon="poll" />
            </List>
          </Overlay>

          <Card theme={{card: styles.splitPersonListCard}}>
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
          </Card>

        </div>
      </div>
    )
  }
});

export default AddBillForm;

AddBillForm.propTypes = {
  onCancel: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onDescriptionChange: React.PropTypes.func.isRequired,
  onAmountChange: React.PropTypes.func.isRequired,
  onDebteeChange: React.PropTypes.func.isRequired,
  onSplitStrategyChange: React.PropTypes.func.isRequired,
  onShareValueChange: React.PropTypes.func.isRequired,
  description: React.PropTypes.string.isRequired,
  debtee: React.PropTypes.string.isRequired,
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
