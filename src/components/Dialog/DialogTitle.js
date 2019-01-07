import * as React from 'react';
import { Title } from '../text';
import styles from './DialogTitle.scss';

export default ({ children }) => (
  <Title className={styles.title}>{children}</Title>
);
