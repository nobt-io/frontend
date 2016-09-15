import React from 'react'
import ReactDOM from 'react-dom';
import styles from './AddPersonPanel.scss'

import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';


export const AddPersonPanel = React.createClass({

  componentDidMount: function(){
    ReactDOM.findDOMNode(this).querySelector('input').focus();
  },

  onKeyDown: function (event) {
    var enterKey = '13';
    if (event.charCode == enterKey) this.onAction();
  },

  onAction: function (event) {
    if (!this.props.buttonIsDisabled) this.props.buttonAction();
  },

  onChange: function (value) {
    this.props.onValueChange(value);
  },

  render: function () {
    return (
      <section className={styles.AddPersonPanel}>
        {this.props.children}
        <div className={styles.AddPersonInput}>
          <Input className={styles.InputContainer} type='text' name='name' onKeyPress={this.onKeyDown} onChange={this.onChange} maxLength={40}/>
          <Button className={styles.AddButton} icon='add_circle_outline' onClick={this.onAction} disabled={this.props.buttonIsDisabled} floating/>
        </div>
      </section>
    );
  },

  getDefaultProps: function () {
    return {
      buttonIsDisabled: false,
      buttonAction: () => { },
      onValueChange: (val) => { }
    };
  },

  propTypes: {
    buttonIsDisabled: React.PropTypes.bool,
    buttonAction: React.PropTypes.func,
    onValueChange: React.PropTypes.func
  }
});


export default AddPersonPanel
