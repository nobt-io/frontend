import * as React from "react";
import { Input } from "react-toolbox-legacy/lib/input";
import ContinueButton from "../../../../components/ContinueButton";
import styles from "./BasicInformationForm.scss";
import NobtNameInputTheme from "./NobtNameInputTheme.scss";
import { connect } from "react-redux";
import { getCurrency, getNobtName } from "../../../../modules/selectors";
import { changeNobtName, selectCurrency } from "../../../../modules/actions";
import LocationBuilder from "../../../../../App/modules/navigation/LocationBuilder";
import CurrencySelect from "../../../../../../components/CurrencySelect/CurrencySelect";

class BasicInformationForm extends React.Component {
  render = () => (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Create</h1>

      <div className={styles.introductionTextContainer}>
        <p>
          Nobts are used for any occasion where you want to split bills among a
          group of people.
        </p>
      </div>

      <div className={styles.form}>
        <div className={styles.formLine}>
          <label>Name your Nobt</label>
          <Input
            hint="Barbecue, London Trip, ..."
            theme={NobtNameInputTheme}
            value={this.props.nobtName}
            onChange={this.props.changeNobtName}
          />
        </div>

        <div className={styles.formLine}>
          <label>Choose currency</label>
          <CurrencySelect
            selectedCurreny={this.props.currency}
            onCurrencyChanged={option =>
              option
                ? this.props.selectCurrency(option.value)
                : this.props.selectCurrency(null)
            }
          />
          <div className={styles.description}>
            <p>
              This is the default currency for all bills you add to the Nobt.
              Bills in foreign currencies can be converted to this one.
            </p>
          </div>
        </div>

        <div className={styles.continueButtonContainer}>
          <ContinueButton
            label="Continue"
            disabled={!this.props.nobtName}
            icon="arrow_forward"
            onClick={() =>
              LocationBuilder.fromWindow()
                .pop()
                .push("members")
                .apply(this.props.push)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default connect(
  state => ({
    nobtName: getNobtName(state),
    currency: getCurrency(state)
  }),
  {
    changeNobtName,
    selectCurrency
  }
)(BasicInformationForm);
