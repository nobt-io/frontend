import React from "react";
import Input from "react-toolbox/lib/input";
import { IconButton } from "react-toolbox/lib/button";
import styles from "./SingleInputInlineForm.scss";
import ButtonTheme from "./ButtonTheme.scss";
import InputTheme from "./InputTheme.scss";
import _debug from "debug";
import merge from "styles/merge";
import classnames from "classnames";

export default class SingleInputInlineForm extends React.Component {

  handleOnInputKeyPress = (event) => {
    let enterKey = 13;
    if (event.charCode === enterKey && !this.isButtonDisabled()) {
      this.handleOnButtonClick();
    }
  };

  handleOnButtonClick = () => {
    this.props.onSubmit();
    this.props.onChange("");
  };

  isButtonDisabled = () => {
    return this.props.value === "" || this.props.isButtonDisabled();
  };

  render = () => (
    <div className={classnames(this.props.className, styles.SingleInputInlineForm)}>
      <Input
        value={this.props.value}
        autoComplete="off"
        type='text'
        onKeyPress={this.handleOnInputKeyPress}
        onChange={this.props.onChange}
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

    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,

    onSubmit: React.PropTypes.func,
    isButtonDisabled: React.PropTypes.func,

    inputProps: React.PropTypes.object,
    buttonProps: React.PropTypes.object
  };
}
