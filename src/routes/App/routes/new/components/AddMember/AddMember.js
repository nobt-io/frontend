import React from "react";
import styles from "./AddMember.scss";
import addButtonTheme from "./AddButtonTheme.scss";
import inputTheme from "../InputTheme.scss";
import SingleInputInlineForm from "components/SingleInputInlineForm";
import { connect } from "react-redux";
import { isExistingMemberFactory } from "../../modules/addBillForm/selectors";

class AddMember extends React.Component {

  state = {
    memberToAdd: ""
  };

  setMemberToAdd = (name) => this.setState({ memberToAdd: name });

  render = () => (
    <div className={styles.inputContainer}>
      <SingleInputInlineForm
        value={this.state.memberToAdd}
        onChange={this.setMemberToAdd}
        buttonProps={{
          icon: "check_circle",
          theme: addButtonTheme
        }}
        inputProps={{
          theme: inputTheme,
          icon: "person_add",
          placeholder: "Someone else?"
        }}
        isButtonDisabled={this.isNewMemberInvalid}
        onSubmit={this.handleOnNewMember}/>
    </div>
  );

  isNewMemberInvalid = () => {
    let newMember = this.state.memberToAdd.trim();
    return this.props.isExistingMember(newMember) || newMember.length === 0;
  };

  handleOnNewMember = () => {
    let newMember = this.state.memberToAdd.trim();
    this.props.onNewMember(newMember);
  };

  static propTypes = {
    onNewMember: React.PropTypes.func.isRequired
  }
}

export default connect(
  (state) => ({
    isExistingMember: isExistingMemberFactory(state)
  })
)(AddMember)
