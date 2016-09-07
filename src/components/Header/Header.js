import React from 'react'

import AppBar from 'react-toolbox/lib/app_bar';
import Button from 'react-toolbox/lib/button';

import styles from './Header.scss';

export const Header = () => (
  <AppBar fixed flat>
    <h1>nobt.io</h1>
    <div className={styles.buttonContainer}>
      <Button className={styles.button} icon="done" accent>test</Button>
    </div>
  </AppBar>
);

export default Header
