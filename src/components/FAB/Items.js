import * as React from 'react';
import styles from './Items.scss';

export default ({ children, expanded }) => (
  <div className={styles.items}>
    {React.Children.map(children, child =>
      React.cloneElement(child, { expanded })
    )}
  </div>
);
