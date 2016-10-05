import React from "react";
import ReactDOM from "react-dom";
import styles from "./AddPersonPanel.scss";
import Input from "react-toolbox/lib/input";
import Button from "react-toolbox/lib/button";


export const AddPersonPanel = React.createClass({

  componentDidMount: function () {
    ReactDOM.findDOMNode(this).querySelector('input').focus();
    ReactDOM.findDOMNode(this).querySelector('input').autocomplete = "off";
  },

  onKeyDown: function (event) {
    var enterKey = '13';
    if (event.charCode == enterKey) {
      this.onAction();
    }
  },

  onAction: function (event) {
    if (!this.props.buttonIsDisabled) {
      this.props.onButtonClick();
      ReactDOM.findDOMNode(this).querySelector('input').value = "";
      ReactDOM.findDOMNode(this).querySelector('input').focus();
    }
  },

  onChange: function (value) {
    this.props.onValueChange(value);
  },

  render: function () {
    return (
      <section className={styles.AddPersonPanel}>
        {this.props.children}
        <div className={styles.AddPersonInput}>
          <Input autoComplete="off" className={styles.InputContainer} type='text' name='name'
                 onKeyPress={this.onKeyDown} onChange={this.onChange} maxLength={40}/>
          <Button className={styles.AddButton} icon='add_circle_outline' onClick={this.onAction}
                  disabled={this.props.buttonIsDisabled} floating/>
        </div>
      </section>
    );
  }
});

AddPersonPanel.defaultProps = {
  buttonIsDisabled: false,
  onButtonClick: () => { },
  onValueChange: (val) => { }
};

AddPersonPanel.propTypes = {
  buttonIsDisabled: React.PropTypes.bool,
  onButtonClick: React.PropTypes.func,
  onValueChange: React.PropTypes.func
};

export default AddPersonPanel
