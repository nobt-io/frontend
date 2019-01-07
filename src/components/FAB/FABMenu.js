import * as React from 'react';
import styles from './FABMenu.scss';

export default ({ children, expanded }) => (
  <div className={styles.container}>
    {React.Children.map(children, child =>
      React.cloneElement(child, { expanded })
    )}
  </div>
);
