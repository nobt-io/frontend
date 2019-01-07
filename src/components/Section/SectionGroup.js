import * as React from 'react';
import styles from './Section.scss';

export default ({ children }) => (
  <div className={styles.sectionGroup}>{children}</div>
);
