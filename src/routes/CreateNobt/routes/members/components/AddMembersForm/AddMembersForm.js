import * as React from "react";
import { connect } from "react-redux";
import SingleInputInlineForm from "components/SingleInputInlineForm";
import styles from "./AddMembersForm.scss";
import PersonListTheme from "./PersonListTheme.scss";
import HOList from "containers/HOList";
import { Button, IconButton } from "react-toolbox/lib/button";
import { Person, AvatarPosition } from "components/Person";
import { AvatarSize } from "components/Avatar";
import { getPersonNames, getCreationStatus } from "../../../../modules/selectors";
import { addPerson, removePerson, createNobt } from "../../../../modules/actions";
import CreateNobtButtonTheme from "./CreateNobtButtonTheme.scss";
import AddButtonTheme from "./AddButtonTheme.scss";
import AddMemberInputTheme from "./AddMemberInputTheme.scss";
import { Snackbar } from "react-toolbox/lib/snackbar";
import AsyncActionStatus from "const/AsyncActionStatus";
import LocationBuilder from "../../../../../App/modules/navigation/LocationBuilder";

class AddMembersForm extends React.Component {

  render = () => (
    <div>
      <h1>Add participants</h1>

      <div className={styles.introductionTextContainer}>
        <p>Add anyone you want to split bills with.</p>
      </div>

      <div className={styles.form}>

        <div className={styles.memberList}>

          <SingleInputInlineForm
            containerClass={styles.addMemberInputInlineForm}
            onSubmit={this.props.addPerson}
            inputProps={{
              icon: "person",
              theme: AddMemberInputTheme,
              placeholder: "Name"
            }}
            buttonProps={{
              icon: "add_circle",
              theme: AddButtonTheme
            }}
          />

          <HOList
            theme={PersonListTheme}
            items={this.props.personNames}
            renderItem={ (name) => (
              <div className={PersonListTheme.item} key={name}>
                <Person avatarPosition={AvatarPosition.LEFT} avatarSize={AvatarSize.MEDIUM} name={name} />
                <IconButton icon='clear' onClick={() => this.props.removePerson(name)}
                />
              </div>
            )} />
        </div>

        <div className={styles.createNobtButtonContainer}>
          <Button
            label="Create Nobt"
            raised
            primary
            theme={CreateNobtButtonTheme}
            disabled={ this.props.personNames.length == 0 }
            icon="done"
            onClick={ this.props.createNobt }
          />
        </div>

        <div className={styles.note}>
          <p>Don't mind about forgetting someone, <br/> you can add further people later.</p>
        </div>

      </div>

      {
        this.props.creationStatus === AsyncActionStatus.SUCCESSFUL && LocationBuilder.fromWindow().pop().push("done").apply(this.props.push)
      }

      <Snackbar
        action='Retry?'
        active={this.props.creationStatus === AsyncActionStatus.FAILED}
        label='Failed to create nobt.'
        type='warning'
        onClick={this.props.createNobt}
      />
    </div>
  )
}

export default connect(
  (state) => ({
    personNames: getPersonNames(state),
    creationStatus: getCreationStatus(state)
  }),
  {
    addPerson,
    removePerson,
    createNobt
  }
)(AddMembersForm)
