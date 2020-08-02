import styles from './LoadingNobt.scss';
import { ProgressBar } from 'react-toolbox-legacy/lib/progress_bar';
import React from 'react';

export default function LoadingNobt() {
  return (
    <div className={styles.loader}>
      <div className={styles.separator} />
      <div className={styles.progressBar}>
        <ProgressBar type="circular" mode="indeterminate" multicolor />
      </div>
    </div>
  );
}
