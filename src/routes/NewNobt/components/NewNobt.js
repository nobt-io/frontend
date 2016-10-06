import React from "react";
import { Button } from "react-toolbox/lib/button";
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

  render: function () {
    return (
      <div className={styles.NewNobt}>
        <Header showButton={true}>
          <Button className={styles.button} icon="check_box">Create Nobt</Button>
        </Header>

        <div className={styles.metaInformationContainer}>
          <Input
            theme={ { input: styles.nobtNameContainer, inputElement: styles.nobtNameInput } }
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

        <div className={styles.addPersonContainer}>
          <SingleInputInlineForm buttonIcon="add_circle_outline"
                                 isButtonDisabled={this.props.isEvilTwin}
                                 placeholder="Who is in?"
                                 onSubmit={this.props.addPerson}/>
        </div>

        <div className={styles.personListContainer}>
          <PersonList persons={this.props.personNames} onPersonRemove={this.props.removePerson}/>
        </div>
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
};

NewNobt.defaultProps = {
  personNames: []
};

export default NewNobt;
