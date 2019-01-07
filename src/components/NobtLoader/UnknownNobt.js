import React from 'react';
import BrandedAppBar from '../BrandedAppBar/BrandedAppBar';
import styles from './UnknownNobt.scss';
import { FontIcon } from 'react-toolbox-legacy/lib/font_icon/index';

export default () => (
  <div>
    <BrandedAppBar />

    <div className={styles.container}>
      <span className={styles.icon}>
        <FontIcon value="error_outline" />
      </span>
      <p>Uff. That link didn't work, sorry about that!</p>
    </div>
  </div>
);
