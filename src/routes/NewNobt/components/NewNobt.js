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
      this.props.nobtNameChanged(nobtNameFromURL);
    }
  },

  createNobt: function () {
    this.props.createNobt().then((response) => {
      this.props.history.push(`/${response.data.id}`);
    }, () => {
      //Todo: show error!
    });
  },

  render: function () {
    return (
      <div className={styles.NewNobt}>
        <Header showButton={true} rightButton={
          {
            icon: "",
            title: "Create nobt",
            onClick: this.createNobt,
            active: this.props.isStateValidForCreation
          }
        } />

        <div className={styles.metaInformationContainer}>
          <Input
            theme={ {input: styles.nobtNameContainer, inputElement: styles.nobtNameInput} }
            type="text"
            maxLength={30}
            value={this.props.chosenName}
            onChange={this.props.nobtNameChanged}
          />

          <CurrencyPicker
            selectedCurrency={this.props.selectedCurrency}
            onCurrencyChanged={this.props.currencySelectionChanged}
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
            persons={this.props.personNames}
            onPersonRemove={this.props.removePerson}
          />
        </section>
      </div>
    );
  }
});

NewNobt.propTypes = {
  selectedCurrency: React.PropTypes.string.isRequired,
  currencySelectionChanged: React.PropTypes.func.isRequired,

  chosenName: React.PropTypes.string.isRequired,
  nobtNameChanged: React.PropTypes.func.isRequired,

  personNames: React.PropTypes.arrayOf(React.PropTypes.string),
  removePerson: React.PropTypes.func.isRequired,
  isEvilTwin: React.PropTypes.func.isRequired,
  addPerson: React.PropTypes.func.isRequired,
  isStateValidForCreation: React.PropTypes.bool.isRequired
};

NewNobt.defaultProps = {
  personNames: []
};

export default NewNobt;
