import React from 'react'
import styles from './Footer.scss'
import { FontIcon } from "react-toolbox/lib/font_icon";

export const Footer = () => (
  <div className={styles.footerContainer}>
    <div className={styles.helpFooter}>
      <span className={styles.helpIcon}><FontIcon value="live_help" /></span>
      <span><a href="mailto:hello@nobt.io">hello@nobt.io</a></span>
    </div>
    <div className={styles.loveFooter}>
      <div>made with </div>
      <div className={styles.loveIcon}><FontIcon value="favorite" /></div>
      <div>in Vienna</div>
    </div>
  </div>
)

export default Footer
