import React from 'react'
import AppBar from "react-toolbox/lib/app_bar";
import {Button, IconButton} from "react-toolbox/lib/button";
import Input from "react-toolbox/lib/input";
import FontIcon from "react-toolbox/lib/font_icon";

import Header from "components/Header";
import CurrencyInput from "components/CurrencyInput";
import DebteePicker from "./DebteePicker"

import styles from './AddBillForm.scss'

export const AddBillForm = React.createClass({

  getInitialState() {
    return {
      debtee: "?",
      description: "",
      amount: null
    }
  },

  handleOnDescriptionChanged(newDescription) {
    this.setState({ description: newDescription});
  },

  handleOnAmountChanged(newAmount) {
    this.setState({ amount: newAmount});
  },

  handleOnDebteeChanged(newDebtee) {
    this.setState({ debtee: newDebtee});
  },

  handleOnSubmit() {
    var billToAdd = {

    };

    this.props.onSubmit(billToAdd);
  },

  render() {

    return (
      <div>
        <AppBar>
          <Header
            left={<IconButton icon="close" onClick={this.props.onCancel} theme={{ icon: styles.cancelButton }} />}
            right={<Button icon="done" onClick={this.props.onSubmit} theme={{ button: styles.addBillButton }}>Save</Button>}
          />
        </AppBar>

        <div className={styles.row}>
          <div className={`${styles.formElement} ${styles.descriptionInputContainer}`}>
            <FontIcon className={styles.icon} value="description" />
            <Input placeholder="What was bought?" value={this.state.description} onChange={this.handleOnDescriptionChanged} />
          </div>
        </div>

        <div className={styles.row}>

          <div className={`${styles.amountInputContainer} ${styles.formElement}`}>
            <div className={styles.iconContainer}>
              <FontIcon className={styles.currencySymbol} children="€" />
            </div>

            <CurrencyInput onChange={this.handleOnAmountChanged} value={this.state.amount} />
          </div>

          <DebteePicker
            value={this.state.debtee}
            className={`${styles.formElement} ${styles.debteePicker}`}
            names={["Thomas", "Lukas", "Philipp Maierhofer"]}
            onDebteePicked={ this.handleOnDebteeChanged }
          />

        </div>

        <div className={styles.billSplitInfoContainer}>

          <span>Split bill into</span>

          <span className={styles.billSplitInfoMessage}>equal</span>

          <span>shares.</span>

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
