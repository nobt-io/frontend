import React from 'react'

import AppBar from 'react-toolbox/lib/app_bar';

import styles from './Header.scss';

export const Header = (props) => (
 <AppBar className={styles.header}>
    <h1>nobt.io</h1>
    <div className={styles.buttonContainer}>
      {props.children}
    </div>
  </AppBar>
);

export default Header
