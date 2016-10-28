import React from 'react'
import AppBar from "react-toolbox/lib/app_bar";
import { Button, IconButton } from "react-toolbox/lib/button";
import Input from "react-toolbox/lib/input";
import FontIcon from "react-toolbox/lib/font_icon";
import Checkbox from "react-toolbox/lib/checkbox";
import { List, ListItem } from "react-toolbox/lib/list"
import Dropdown from 'react-toolbox/lib/dropdown';
import { Card, CardTitle } from 'react-toolbox/lib/card';

import Header from "components/Header";
import CurrencyInput from "components/CurrencyInput";
import Overlay from "components/Overlay"
import CloseButton from "components/CloseButton"
import { AmountEqualSplitPersonList } from "components/AmountSplitPersonList"

import Visibility from "const/Visibility"
import SplitStrategyNames from "const/SplitStrategyNames"

import DebteePicker from "./DebteePicker"
import styles from './AddBillForm.scss'
import ShareListItem from "./ShareListItem"

export const AddBillForm = React.createClass({

  getInitialState() {
    return {
      debtee: "?",
      description: "",
      amount: null,
      splitStrategy: SplitStrategyNames.EQUAL,
      splitStrategySelectorOverlayVisibility: Visibility.HIDDEN
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
            right={<IconButton icon="settings" neutral={false} onClick={this.openSplitStrategySelectorOverlay}/>}
          />

          <Overlay visibility={this.state.splitStrategySelectorOverlayVisibility} onClickOutside={this.closeSplitStrategySelectorOverlay}>
            <Header
              left={<h3>Split bill into</h3>}
              right={<CloseButton onClick={this.closeSplitStrategySelectorOverlay} />}
            />
            <List selectable ripple>
              <ListItem key="EQUAL" onClick={() => this.handleOnSplitStrategySelected(SplitStrategyNames.EQUAL)} caption="equal shares"
                        leftIcon="view_module" />
              <ListItem key="UNEQUAL" onClick={() => this.handleOnSplitStrategySelected(SplitStrategyNames.UNEQUAL)} caption="custom shares"
                        leftIcon="view_quilt" />
              <ListItem key="PERCENTAGE" onClick={() => this.handleOnSplitStrategySelected(SplitStrategyNames.PERCENTAGE)} caption="percental shares"
                        leftIcon="poll" />
            </List>
          </Overlay>

          <Card theme={{card: styles.splitPersonListCard}}>
            <div>
              <ShareListItem name={"Thomas"} amount={30} control={<Checkbox checked/>}/>
              <ShareListItem name={"Philipp"} amount={40} control={<Checkbox />}/>
              <ShareListItem name={"Martin"} amount={20} control={<Checkbox />}/>
            </div>
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
