import React from 'react'

import Overlay from "components/Overlay"
import PersonPicker from "components/PersonPicker"
import { Avatar, AvatarSize } from "components/Avatar"
import Header from "components/Header"

import Visibility from "const/Visibility"

import styles from './DebteePicker.scss'

const DebteePicker = React.createClass({

  getInitialState() {
    return {
      overlayVisibility: Visibility.HIDDEN,
    }
  },

  handleOnPersonPicked(person) {
    this.props.onDebteePicked(person);
    this.closeOverlay();
  },

  closeOverlay() {
    this.setState({ overlayVisibility: Visibility.HIDDEN })
  },

  openOverlay() {
    this.setState({ overlayVisibility: Visibility.VISIBLE })
  },

  render() {
    return (
      <div className={this.props.className}>
        <div className={styles.DebteePicker} onClick={this.openOverlay}>
          <div className={styles.avatar}>
            <Avatar name={this.props.value} size={AvatarSize.BIG}/>
          </div>

          <div className={styles.debteeContainer}>
            <div className={styles.label}>paid by</div>
            <div className={styles.debtee}>{this.props.value}</div>
          </div>
        </div>

        <Overlay visibility={this.state.overlayVisibility} onClickOutside={this.closeOverlay}>
          <Header left={<h3>Who paid?</h3>}/>
          <PersonPicker names={this.props.names} onPersonPicked={this.handleOnPersonPicked}/>
        </Overlay>
      </div>
    )
  }
});

export default DebteePicker;

DebteePicker.propTypes = {
  value: React.PropTypes.string.isRequired,
  names: React.PropTypes.arrayOf( React.PropTypes.string ).isRequired,
  onDebteePicked: React.PropTypes.func.isRequired
};
