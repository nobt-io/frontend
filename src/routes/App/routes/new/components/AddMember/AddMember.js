import React from "react";
import InputTheme from "../InputTheme.scss";
import { connect } from "react-redux";
import { isExistingMemberFactory } from "../../modules/addBillForm/selectors";
import { Input } from "react-toolbox/lib/input/index";
import { IconButton } from "react-toolbox/lib/button/index";
import { ListItem } from "react-toolbox/lib/list/index";
import AddButtonTheme from "./AddButtonTheme.scss"

class AddMember extends React.Component {

  state = {
    value: ""
  };

  handleOnInputKeyPress = (event) => {
    let enterKey = 13;
    if (event.charCode === enterKey && !this.isNewMemberInvalid()) {
      this.handleOnButtonClick();
    }
  };

  handleOnInputChange = (value) => {
    this.setState({value});
  };

  handleOnButtonClick = () => {
    let value = this.getValue();

    this.handleOnNewMember(value);
    this.handleOnInputChange("");
  };

  getValue = () => {
    let {value} = this.state;

    return value.trim();
  };

  isNewMemberInvalid = () => {
    let newMember = this.getValue();
    return this.props.isExistingMember(newMember) || newMember.length === 0;
  };

  handleOnNewMember = (name) => {
    let newMember = name.trim();
    this.props.onNewMember(newMember);
  };

  render = () => (
    <ListItem
      ripple={false}
      itemContent={<Input
        value={this.state.value}
        autoComplete="off"
        type='text'
        placeholder="Someone else?"
        onKeyPress={this.handleOnInputKeyPress}
        onChange={this.handleOnInputChange}
        theme={InputTheme}
      />}
      rightActions={[
        <IconButton
          theme={AddButtonTheme}
          onClick={this.handleOnButtonClick}
          disabled={this.isNewMemberInvalid()}
          icon="person_add"
        />
      ]}
    />
  );

  static propTypes = {
    onNewMember: React.PropTypes.func.isRequired
  }
}

export default connect(
  (state) => ({
    isExistingMember: isExistingMemberFactory(state)
  })
)(AddMember)
