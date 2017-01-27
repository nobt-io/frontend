import React from "react";
import styles from "./AddMember.scss";
import addButtonTheme from "./AddButtonTheme.scss";
import inputTheme from "../InputTheme.scss";
import SingleInputInlineForm from "components/SingleInputInlineForm";
import { connect } from "react-redux";
import { getMembers } from "../../../../modules/currentNobt/selectors";

class AddMember extends React.Component {

  render = () => (
    <div className={styles.inputContainer}>
      <SingleInputInlineForm
        buttonIcon="check_circle"
        inputTheme={inputTheme}
        buttonTheme={addButtonTheme}
        inputIcon="person_add"
        isButtonDisabled={this.isNewMemberInvalid}
        onSubmit={this.handleOnNewMember}
        placeholder="Someone else?" />
    </div>
  );

  isNewMemberInvalid = (name) => {
    let newMember = name.trim();
    return this.props.members.indexOf(newMember) >= 0 || newMember.length == 0;
  };

  handleOnNewMember = (name) => {
    let newMember = name.trim();
    this.props.onNewMember(newMember);
  };

  static propTypes = {
    onNewMember: React.PropTypes.func.isRequired
  }
}

export default connect(
  (state) => ({
    members: getMembers(state)
  })
)(AddMember)
