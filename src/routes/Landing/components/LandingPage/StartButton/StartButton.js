import PropTypes from 'prop-types';
import React from 'react';
import styles from './StartButton.scss';

const StartButton = ({ active, ...props }) => {
  let className = active ? styles.activeButton : styles.button;

  return (
    <a className={className} href="create" {...props}>
      Get started - Create a Nobt
    </a>
  );
};

StartButton.propTypes = {
  active: PropTypes.bool,
};

export default StartButton;
