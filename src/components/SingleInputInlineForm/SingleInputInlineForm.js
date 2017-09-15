import React from "react";
import Input from "react-toolbox/lib/input";
import { IconButton } from "react-toolbox/lib/button";
import styles from "./SingleInputInlineForm.scss";
import ButtonTheme from "./ButtonTheme.scss";
import InputTheme from "./InputTheme.scss";
import _debug from "debug";
import merge from "styles/merge";
import classnames from "classNames";

export default class SingleInputInlineForm extends React.Component {

  state = {
    value: ""
  };

  handleOnInputKeyPress = (event) => {
    let enterKey = 13;
    if (event.charCode === enterKey && !this.isButtonDisabled()) {
      this.handleOnButtonClick();
    }
  };

  handleOnInputChange = (value) => this.setState({ value: value });

  handleOnButtonClick = () => {
    let value = this.state.value;

    _debug('SingleInputInlineForm:onSubmit')(value);
    this.props.onSubmit(value);
    this.handleOnInputChange("");
  };



  isButtonDisabled = () => {
    let value = this.state.value;

    return value === "" || this.props.isButtonDisabled(value);
  };

  render = () => (
    <div className={classnames(this.props.className, styles.SingleInputInlineForm)}>
      <Input
        value={this.state.value}
        autoComplete="off"
        type='text'
        onKeyPress={this.handleOnInputKeyPress}
        onChange={this.handleOnInputChange}
        {...this.props.inputProps}
        theme={merge(InputTheme, this.props.inputProps.theme)}
      />
      <IconButton
        onClick={this.handleOnButtonClick}
        disabled={this.isButtonDisabled()}
        {...this.props.buttonProps}
        theme={merge(ButtonTheme, this.props.buttonProps.theme)}
      />
    </div>
  )

  static defaultProps = {
    className: '',
    onSubmit: (value) => { },
    isButtonDisabled: (name) => false
  };

  static propTypes = {
    className: React.PropTypes.string,

    onSubmit: React.PropTypes.func,
    isButtonDisabled: React.PropTypes.func,

    inputProps: React.PropTypes.object,
    buttonProps: React.PropTypes.object
  };
}
