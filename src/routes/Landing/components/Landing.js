import React from 'react'
import styles from './Landing.scss'
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import FontIcon from 'react-toolbox/lib/font_icon';

import Phones from '../assets/phones.png'
import Bg from '../assets/bg.jpg'

export const Landing = React.createClass({
  getInitialState () {
    return {nobtName: ""};
  },
  handleChange: function (nobtName) {
    this.setState({...this.state, nobtName});
  },
  onCreateNobt: function(){
    this.props.history.push(`/new/${this.state.nobtName}`);
  },
  onKeyPress: function (event) {
    var enterKey = 13;
    if (event.charCode === enterKey) {
      this.onCreateNobt();
    };
  },
  render: function () {

    var addressVisibility = this.state.nobtName.length > 0 ? "visible" : "hidden";

    return <div>
      <div className={styles.landing} style={{backgroundImage: "url('" + Bg + "')"}} >
        <div className={styles.backgroundShadow}></div>
        <div className={styles.container}>
          <div className={styles.title}>nobt.io</div>
          <div className={styles.slogan}>Split your bills with ease</div>
          <div className={styles.createNobtContainer}>
            <div className={styles.inputContainer}>
              <Input placeholder="barbecue with friends" type="text" maxLength={ 40 }
                     value={this.state.nobtName} onChange={this.handleChange}  onKeyPress={this.onKeyPress}
                     theme={{input: styles.inputWrapper, bar: styles.inputBar, counter: styles.inputCounter, inputElement: styles.inputElement}} />
            </div>
            <div className={styles.buttonContainer}>
              <Button theme={{button: styles.button}} icon='check' label='create nobt' onClick={this.onCreateNobt} accent raised />
            </div>
          </div>
          <div style={{visibility: addressVisibility}}  className={styles.addressContainer}>
            <div className={styles.icon}><FontIcon value='link' /></div>
            <div className={styles.url}><a href={"http://nobt.io/new/"+this.state.nobtName}>nobt.io/new/<b>{this.state.nobtName}</b></a></div>
          </div>
        </div>
        <div style={{backgroundImage: "url('" + Phones + "')"}} className={styles.phoneContainer}>
        </div>
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.helpFooter}>
          <span className={styles.helpIcon}><FontIcon value="live_help" /></span>
          <span><a href="mailto:hello@nobt.io">hello@nobt.io</a></span>
        </div>
        <div className={styles.loveFooter}>
          <div>made with </div>
          <div className={styles.loveIcon}><FontIcon value="favorite" /></div>
          <div>in vienna</div>
        </div>
      </div>
    </div>

  }
})

export default Landing
