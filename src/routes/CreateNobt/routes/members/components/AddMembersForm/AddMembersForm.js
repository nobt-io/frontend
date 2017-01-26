import * as React from "react";
import { connect } from "react-redux";
import SingleInputInlineForm from "components/SingleInputInlineForm";
import styles from "./AddMembersForm.scss";
import PersonListTheme from "./PersonListTheme.scss";
import HOList from "containers/HOList";
import { Button, IconButton } from "react-toolbox/lib/button";
import { Person, AvatarPosition } from "components/Person";
import { AvatarSize } from "components/Avatar";
import { getPersonNames } from "../../../../modules/selectors";
import { addPerson, removePerson, createNobt } from "../../../../modules/actions";
import CreateNobtButtonTheme from "./CreateNobtButtonTheme.scss";
import AddButtonTheme from "./AddButtonTheme.scss";
import AddMemberInputTheme from "./AddMemberInputTheme.scss";

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

    </div>
  )
}

export default connect(
  (state) => ({
    personNames: getPersonNames(state),
  }),
  {
    addPerson,
    removePerson,
    createNobt
  }
)(AddMembersForm)
