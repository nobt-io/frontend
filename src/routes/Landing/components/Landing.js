import React from 'react'
//import styles from './Landing.legacy.scss'
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import FontIcon from 'react-toolbox/lib/font_icon';

import Phones from './LandingPage/assets/phones.png'
import Bg from './LandingPage/assets/bg.jpg'

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


        </div>
        <div style={{backgroundImage: "url('" + Phones + "')"}} className={styles.phoneContainer}>
        </div>
      </div>





    </div>

  }
})

export default Landing
