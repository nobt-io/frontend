import React from 'react';
import styles from './Logo.scss';

export const Logo = props => {
  return (
    <div className={styles.Logo}>
      {props.isLink ? (
        <h1>
          <a href="http://nobt.io">nobt.io</a>
        </h1>
      ) : (
        <h1>nobt.io</h1>
      )}
    </div>
  );
};
export default Logo;
