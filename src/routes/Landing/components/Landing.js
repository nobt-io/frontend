import React from 'react'
import styles from './Landing.scss'
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import FontIcon from 'react-toolbox/lib/font_icon';

export const Landing = React.createClass({
  getInitialState () {
    return {nobtName: ""};
  },
  handleChange: function (nobtName) {
    this.setState({...this.state, nobtName});
  },

  render: function () {

    var showAdress = this.state.nobtName.length > 0;

    return <div className={styles.landing}>
      <div className={styles.flexContainer}>
        <div className={styles.title}>nobt.io</div>
        <div className={styles.slogan}>Split your bills with ease</div>
        <div className={styles.createNobtContainer}>
          <div className={styles.inputContainer}>
            <Input placeholder="barbecue with friends" type="text" maxLength={ 40 }
                   value={this.state.nobtName} onChange={this.handleChange}
                   theme={{input: styles.inputWrapper, bar: styles.inputBar, counter: styles.inputCounter, inputElement: styles.inputElement}} />
          </div>
          <div className={styles.buttonContainer}>
            <Button theme={{button: styles.button}} icon='check' label='create nobt' accent raised />
          </div>
        </div>
        { showAdress &&
        <div className={styles.addressContainer}>
          <div className={styles.icon}><FontIcon value='link' /></div>
          <div className={styles.url}>nobt.io/new/<b>{this.state.nobtName}</b></div>
        </div>
        }
      </div>
    </div>
  }
})

export default Landing
