import React from "react";
import { Input } from "react-toolbox/lib/input";
import Header from "components/Header";
import CurrencyPicker from "components/CurrencyPicker";
import styles from "./NewNobt.scss";
import SingleInputInlineForm from "components/SingleInputInlineForm";
import PersonList from "components/PersonList";

const NewNobt = React.createClass({

  componentWillMount() {
    var nobtNameFromURL = this.props.params.nobtName;

    if (nobtNameFromURL !== "") {
      this.props.changeNobtName(nobtNameFromURL);
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.creationSuccessful) {
      this.props.history.push(`/${nextProps.createdNobtId}`);
    }
  },

  render: function () {
    return (
      <div className={styles.NewNobt}>
        <Header showButton={true} rightButton={
          {
            icon: "",
            title: "Create nobt",
            onClick: this.props.createNobt,
            active: this.props.canCreateNobt
          }
        } />

        <div className={styles.metaInformationContainer}>
          <Input
            theme={ {input: styles.nobtNameContainer, inputElement: styles.nobtNameInput} }
            type="text"
            maxLength={30}
            value={this.props.chosenName}
            onChange={this.props.changeNobtName}
          />

          <CurrencyPicker
            selectedCurrency={this.props.selectedCurrency}
            onCurrencyChanged={this.props.selectCurrency}
            dropDownTheme={ {
              values: styles.currencies,
              dropdown: styles.currencyPickerContainer,
              field: styles.currencyPickerInput
            } }
          />
        </div>

        <section>
          <SingleInputInlineForm buttonIcon="add_circle_outline"
                                 isButtonDisabled={this.props.isEvilTwin}
                                 placeholder="Who is in?"
                                 onSubmit={this.props.addPerson} />
          <PersonList
            names={this.props.personNames}
            onPersonRemove={this.props.removePerson}
          />
        </section>
      </div>
    );
  }
});

NewNobt.propTypes = {
  // state from selectors
  chosenName: React.PropTypes.string.isRequired,
  personNames: React.PropTypes.arrayOf(React.PropTypes.string),
  selectedCurrency: React.PropTypes.string.isRequired,
  canCreateNobt: React.PropTypes.bool.isRequired,
  isEvilTwin: React.PropTypes.func.isRequired,
  creationSuccessful: React.PropTypes.bool.isRequired,
  creationInProgress: React.PropTypes.bool.isRequired,
  createdNobtId: React.PropTypes.string.isRequired,


  // actions
  selectCurrency: React.PropTypes.func.isRequired,
  changeNobtName: React.PropTypes.func.isRequired,
  addPerson: React.PropTypes.func.isRequired,
  removePerson: React.PropTypes.func.isRequired,
  createNobt: React.PropTypes.func.isRequired
};

NewNobt.defaultProps = {
  personNames: []
};

export default NewNobt;
