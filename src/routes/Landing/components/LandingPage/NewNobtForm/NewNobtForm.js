
import * as React from "react";
import styles from "./NewNobtForm.scss";
import { Input } from "react-toolbox/lib/input";
import SingleInputInlineForm from "components/SingleInputInlineForm";
import { connect } from "react-redux";
import { getPersonNames, getNobtName, canCreateNobt } from "../../../modules/selectors";
import { addPerson, removePerson, changeNobtName, createNobt } from "../../../modules/actions";
import HOList from "containers/HOList";
import { Button, IconButton } from "react-toolbox/lib/button";
import { Person, AvatarPosition } from "components/Person";
import { AvatarSize } from "components/Avatar";
import PersonListTheme from "./PersonListTheme.scss"

class NewNobtForm extends React.Component {

  state = {
    additionalFormElementsClassName: styles.hidden
  };

  showAdditionalFormElements = () => {
    this.setState({ additionalFormElementsClassName: styles.visible })
  };

  render = () => (
    <div className={styles.newNobtFormContainer}>

      <div className={styles.newNobtForm}>
        <Input
          label="Event / Journey name"
          onFocus={this.showAdditionalFormElements}
          hint="Barbecue, London Trip, ..."
          value={this.props.nobtName}
          onChange={this.props.changeNobtName}
        />

        <div className={this.state.additionalFormElementsClassName}>

          <SingleInputInlineForm
            onSubmit={this.props.addPerson}
            buttonProps={{
              icon: "person_add"
            }}
            inputProps={{
              label: this.props.personNames.length == 0 ? "What's your name?" : "Add further friends"
            }}
          />

          <HOList
            theme={PersonListTheme}
            items={this.props.personNames}
            renderItem={ (name) => (
            <div className={PersonListTheme.item} key={name}>
              <Person avatarPosition={AvatarPosition.LEFT} avatarSize={AvatarSize.SMALL} name={name} />
              <IconButton icon='clear' onClick={() => this.props.removePerson(name)}
              />
            </div>
          )} />

          <div className={styles.createNobtButtonContainer}>
            <Button
              label="Create Nobt"
              icon="check"
              raised
              disabled={!this.props.canCreateNobt}
              />
          </div>
        </div>
      </div>

    </div>
  )
}

export default connect(
  (state) => ({
    nobtName: getNobtName(state),
    personNames: getPersonNames(state),
    canCreateNobt: canCreateNobt(state),
  }),
  {
    addPerson,
    removePerson,
    changeNobtName,
    createNobt
  }
)(NewNobtForm);
