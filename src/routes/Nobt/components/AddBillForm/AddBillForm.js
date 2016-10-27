import React from 'react'
import AppBar from "react-toolbox/lib/app_bar";
import Button from "react-toolbox/lib/button";
import Input from "react-toolbox/lib/input";
import FontIcon from "react-toolbox/lib/font_icon";

import Header from "components/Header";
import CurrencyInput from "components/CurrencyInput";
import DebteePicker from "./DebteePicker"

import styles from './AddBillForm.scss'

export const AddBillForm = React.createClass({

  getInitialState() {
    return {
      payer: null,
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

  render() {

    return (
      <div>
        <AppBar>
          <Header
            left={<Button icon="close" theme={{ button: styles.cancelButton }}>Cancel</Button>}
            right={<Button icon="done" theme={{ button: styles.addBillButton }}>Save</Button>}
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

          <DebteePicker className={`${styles.formElement} ${styles.debteePicker}`} name="Alexander Maierhofer"/>

        </div>

        <div className={styles.billSplitInfoContainer}>

          <span>Split into</span>

          <span className={styles.billSplitInfoMessage}>equal</span>

          <span>shares.</span>

        </div>
      </div>
    )
  }
});

export default AddBillForm
