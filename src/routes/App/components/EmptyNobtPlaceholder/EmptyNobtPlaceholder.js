import React from 'react';
import styles from './EmptyNobtPlaceholder.scss';
import withNavigation from 'components/hoc/withNavigation';
import LocationBuilder from '../../modules/navigation/LocationBuilder';
import SafeBox from './safebox.png';

export const EmptyNobtPlaceholder = props => {
  return (
    <div className={styles.container}>
      <div
        style={{ backgroundImage: "url('" + SafeBox + "')" }}
        className={styles.icon}
      />
      <div className={styles.topLabel}>No bills found.</div>
      <div className={styles.linkLabel}>
        <a
          href="#"
          onClick={() =>
            LocationBuilder.fromWindow()
              .push('bill')
              .apply(props.push)
          }
        >
          Add
        </a>{' '}
        your first.
      </div>
    </div>
  );
};

export default withNavigation(EmptyNobtPlaceholder);
