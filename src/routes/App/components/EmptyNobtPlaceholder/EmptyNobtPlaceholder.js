import React from 'react';
import styles from './EmptyNobtPlaceholder.scss';
import SafeBox from './safebox.png';
import NoUnderlineLink from '../../../../components/NoUnderlineLink';
import usePaths from '../../../../hooks/usePaths';

export default function EmptyNobtPlaceholder() {
  const paths = usePaths();

  return (
    <div className={styles.container}>
      <div
        style={{ backgroundImage: "url('" + SafeBox + "')" }}
        className={styles.icon}
      />
      <div className={styles.topLabel}>No bills found.</div>
      <div className={styles.linkLabel}>
        <NoUnderlineLink data-cy="add-bill-link" to={paths.newBill()}>
          Add
        </NoUnderlineLink>{' '}
        your first.
      </div>
    </div>
  );
}
