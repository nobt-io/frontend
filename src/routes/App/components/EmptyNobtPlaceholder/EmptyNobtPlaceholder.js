import React from 'react';
import styles from './EmptyNobtPlaceholder.scss';
import SafeBox from './safebox.png';
import { useHistory } from 'react-router-dom';

export const EmptyNobtPlaceholder = props => {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div
        style={{ backgroundImage: "url('" + SafeBox + "')" }}
        className={styles.icon}
      />
      <div className={styles.topLabel}>No bills found.</div>
      <div className={styles.linkLabel}>
        <a
          data-cy="add-bill-link"
          href="#"
          onClick={() => history.push('/bill')}
        >
          Add
        </a>{' '}
        your first.
      </div>
    </div>
  );
};

export default EmptyNobtPlaceholder;
