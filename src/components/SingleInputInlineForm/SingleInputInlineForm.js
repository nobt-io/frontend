import React from "react";
import Input from "react-toolbox/lib/input";
import { IconButton } from "react-toolbox/lib/button";
import styles from "./SingleInputInlineForm.scss";
import _debug from "debug";
import classnames from "classnames";

export const SingleInputInlineForm = React.createClass({

  getInitialState() {
    return {
      value: ""
    }
  },

  onKeyPress: function (event) {
    var enterKey = 13;
    if (event.charCode === enterKey && !this.isButtonDisabled()) {
      this.onClick();
    }
  },

  onChange: function (value) {
    this.setState({
      value: value
    });
  },

  onClick: function () {
    var value = this.state.value;

    _debug('SingleInputInlineForm:onSubmit')(value);
    this.props.onSubmit(value);
    this.onChange("");
  },

  isButtonDisabled: function () {
    var value = this.state.value;

    return value === "" || this.props.isButtonDisabled(value);
  },

  render: function () {

    var inputTheme = Object.assign({}, this.props.inputTheme, {
      input: classnames(this.props.inputTheme.input, styles.input)
    });

    var buttonTheme = Object.assign({}, this.props.buttonTheme, {
      toggle: classnames(this.props.buttonTheme.toggle, styles.button)
    });

    return (
      <div className={classnames(this.props.containerClass, styles.SingleInputInlineForm)}>
        <Input
          value={this.state.value}
          theme={inputTheme}
          placeholder={this.props.placeholder}
          autoComplete="off"
          type='text'
          maxLength={this.props.inputMaxLength}
          onKeyPress={this.onKeyPress}
          onChange={this.onChange}
        />
        <IconButton
          theme={buttonTheme}
          icon={this.props.buttonIcon}
          onClick={this.onClick}
          disabled={this.isButtonDisabled()}
        />
      </div>
    )
  }
});
SingleInputInlineForm.defaultProps = {
  inputMaxLength: 40,
  placeholder: '',
  containerClass: '',
  inputTheme: {},
  buttonTheme: {},
  buttonIcon: '',
  onSubmit: (value) => {
  },
  isButtonDisabled: (name) => false
};

SingleInputInlineForm.propTypes = {
  inputMaxLength: React.PropTypes.number,
  placeholder: React.PropTypes.string,
  containerClass: React.PropTypes.string,
  inputTheme: React.PropTypes.object,
  buttonTheme: React.PropTypes.object,
  buttonIcon: React.PropTypes.string,
  onSubmit: React.PropTypes.func,
  isButtonDisabled: React.PropTypes.func
};

export default SingleInputInlineForm
