import React from "react";
import AppBar from "react-toolbox/lib/app_bar";
import { Button, IconButton } from "react-toolbox/lib/button";
import Input from "react-toolbox/lib/input";
import FontIcon from "react-toolbox/lib/font_icon";
import { List, ListItem } from "react-toolbox/lib/list";
import { Card } from "react-toolbox/lib/card";
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

  getInitialState() {
    return {
      debtee: "?",
      description: "",
      amount: null,
      splitStrategy: SplitStrategyNames.PERCENTAGE,
      splitStrategySelectorOverlayVisibility: Visibility.HIDDEN,
      shares: [
        {
          name: "Thomas",
          amount: 30,
          value: 10
        },
        {
          name: "Philipp",
          amount: 30,
          value: 20
        },
        {
          name: "Georg",
          amount: null,
          value: 0
        }
      ],
      onShareValueUpdated: (name, value) => {
        console.log(`Updating value of ${name} to ${value}.`);
      }
    }
  },

  handleOnDescriptionChanged(newDescription) {
    this.setState({description: newDescription});
  },

  handleOnAmountChanged(newAmount) {
    this.setState({amount: newAmount});
  },

  handleOnDebteeChanged(newDebtee) {
    this.setState({debtee: newDebtee});
  },

  handleSplitStrategyChanged(newSplitStrategy) {
    this.setState({splitStrategy: newSplitStrategy});
  },


  closeSplitStrategySelectorOverlay() { this.setState({splitStrategySelectorOverlayVisibility: Visibility.HIDDEN}) },
  openSplitStrategySelectorOverlay() { this.setState({splitStrategySelectorOverlayVisibility: Visibility.VISIBLE}) },


  handleOnSubmit() {
    var billToAdd = {};

    this.props.onSubmit(billToAdd);
  },

  render() {

    return (
      <div className={styles.form}>
        <AppBar>
          <Header
            left={<IconButton icon="close" onClick={this.props.onCancel} theme={{icon: styles.cancelButton}} />}
            right={<Button icon="done" onClick={this.props.onSubmit} theme={{button: styles.addBillButton}}>Save</Button>}
          />
        </AppBar>

        <h3 className={styles.heading}>Add a new bill</h3>

        <div className={styles.billMetaInfoContainer}>

          <Card className={styles.billMetaInfoInputContainer} theme={{card: styles.billMetaInfoCard}}>
            <div className={styles.row}>
              <div className={`${styles.formElement} ${styles.descriptionInputContainer}`}>
                <FontIcon className={styles.icon} value="description" />
                <Input placeholder="What was bought?" value={this.state.description} onChange={this.handleOnDescriptionChanged} />
              </div>
            </div>

            <div className={styles.row}>

              <div className={`${styles.amountInputContainer} ${styles.formElement}`}>
                <div className={styles.iconContainer}>
                  <FontIcon className={`${styles.currencySymbol} ${styles.icon}`} children="€" />
                </div>

                <CurrencyInput onChange={this.handleOnAmountChanged} value={this.state.amount} />
              </div>

              <DebteePicker
                value={this.state.debtee}
                className={`${styles.formElement} ${styles.debteePicker}`}
                names={[ "Thomas", "Lukas", "Philipp Maierhofer" ]}
                onDebteePicked={ this.handleOnDebteeChanged }
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
              <ListItem key="EQUAL" onClick={() => this.handleSplitStrategyChanged(SplitStrategyNames.EQUAL)} caption="equal shares"
                        leftIcon="view_module" />
              <ListItem key="UNEQUAL" onClick={() => this.handleSplitStrategyChanged(SplitStrategyNames.UNEQUAL)} caption="custom shares"
                        leftIcon="view_quilt" />
              <ListItem key="PERCENTAGE" onClick={() => this.handleSplitStrategyChanged(SplitStrategyNames.PERCENTAGE)} caption="percental shares"
                        leftIcon="poll" />
            </List>
          </Overlay>

          <Card theme={{card: styles.splitPersonListCard}}>
            {this.state.splitStrategy === SplitStrategyNames.EQUAL && (
              <ShareList shares={this.state.shares} renderShareListItem={(share) => (
                <EqualShareListItem key={share.name} share={share} onCheckboxChange={this.state.onShareValueUpdated} />
              )}
              />
            )}

            {this.state.splitStrategy === SplitStrategyNames.UNEQUAL && (
              <ShareList shares={this.state.shares} renderShareListItem={(share) => (
                <CustomShareListItem key={share.name} share={share} onAmountChange={this.state.onShareValueUpdated} />
              )}
              />
            )}

            {this.state.splitStrategy === SplitStrategyNames.PERCENTAGE && (
              <ShareList shares={this.state.shares} renderShareListItem={(share) => (
                <PercentalShareListItem key={share.name} share={share} onPercentageChange={this.state.onShareValueUpdated} />
              )}
              />
            )}
          </Card>

        </div>
      </div>
    )
  }
});

export default AddBillForm

AddBillForm.propTypes = {
  onCancel: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};
