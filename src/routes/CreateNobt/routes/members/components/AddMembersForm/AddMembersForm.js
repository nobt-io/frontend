import * as React from "react";
import { connect } from "react-redux";
import styles from "./AddMembersForm.scss";
import PersonListTheme from "./PersonListTheme.scss";
import HOList from "containers/HOList";
import { IconButton } from "react-toolbox/lib/button";
import { AvatarPosition, Person } from "components/Person";
import { AvatarSize } from "components/Avatar";
import { getCreationStatus, getPersonNames, getPersonToAdd } from "../../../../modules/selectors";
import { addCurrentNameAsPerson, createNobt, removePerson, updateNameOfPersonToAdd } from "../../../../modules/actions";
import ContinueButton from "../../../../components/ContinueButton";
import AddMemberInputTheme from "./AddMemberInputTheme.scss";
import { Snackbar } from "react-toolbox/lib/snackbar";
import AsyncActionStatus from "const/AsyncActionStatus";
import LocationBuilder from "../../../../../App/modules/navigation/LocationBuilder";
import CreateNobtProgressBar from "../../components/CreateNobtProgressBar"
import { Input } from "react-toolbox/lib/input/index";
import {
  getAddPersonButtonLabel,
  isAddPersonButtonDisabled,
  isCreateNobtButtonDisabled,
  shouldRenderAddPersonButton
} from "../../../../modules/selectors.ui";

class AddMembersForm extends React.Component {

  renderContinueButton = () => {

    let {shouldRenderAddPersonButton} = this.props;

    let buttonProps = shouldRenderAddPersonButton ?
      this.getAddPersonButtonProps(this.props) :
      this.getCreateNobtButtonProps(this.props);

    return (
      <ContinueButton {...buttonProps} />
    )
  };

  getAddPersonButtonProps = ({addPersonButtonLabel, addCurrentNameAsPerson, isAddPersonButtonDisabled}) => ({
    label: addPersonButtonLabel,
    icon: 'add',
    onClick: addCurrentNameAsPerson,
    disabled: isAddPersonButtonDisabled
  });

  getCreateNobtButtonProps = ({createNobt, isCreateNobtButtonDisabled}) => ({
      label: "Create Nobt",
      icon: 'done',
      onClick: createNobt,
      disabled: isCreateNobtButtonDisabled
    }
  );

  handleOnKeyPress = (event) => {
    let enterKey = 13;
    if (event.charCode === enterKey && !this.props.isAddPersonButtonDisabled) {
      this.props.addCurrentNameAsPerson();
    }
  };

  render = () => (
    <div>
      <h1>Add participants</h1>

      <div className={styles.introductionTextContainer}>
        <p>Add anyone you want to split bills with.</p>
      </div>

      <div className={styles.form}>

        <div className={styles.memberList}>

          <Input
            value={this.props.personToAdd}
            autoComplete="off"
            type='text'
            icon="person"
            autoFocus
            placeholder="Name"
            onChange={this.props.updateNameOfPersonToAdd}
            onKeyPress={this.handleOnKeyPress}
            theme={AddMemberInputTheme}
          />

          <HOList
            theme={PersonListTheme}
            items={this.props.personNames}
            renderItem={(name) => (
              <div className={PersonListTheme.item} key={name}>
                <Person avatarPosition={AvatarPosition.LEFT} avatarSize={AvatarSize.MEDIUM} name={name} />
                <IconButton icon='clear' onClick={() => this.props.removePerson(name)}
                />
              </div>
            )} />
        </div>

        <div className={styles.createNobtButtonContainer}>

          {
            this.props.creationStatus !== AsyncActionStatus.IN_PROGRESS && this.renderContinueButton()
          }

          {
            this.props.creationStatus === AsyncActionStatus.IN_PROGRESS && <CreateNobtProgressBar />
          }

        </div>

        <div className={styles.note}>
          <p>Don't worry about forgetting someone, <br /> you can add further people later.</p>
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
    creationStatus: getCreationStatus(state),
    personToAdd: getPersonToAdd(state),

    addPersonButtonLabel: getAddPersonButtonLabel(state),
    shouldRenderAddPersonButton: shouldRenderAddPersonButton(state),
    isCreateNobtButtonDisabled: isCreateNobtButtonDisabled(state),
    isAddPersonButtonDisabled: isAddPersonButtonDisabled(state)
  }),
  {
    addCurrentNameAsPerson,
    removePerson,
    createNobt,
    updateNameOfPersonToAdd
  }
)(AddMembersForm)
