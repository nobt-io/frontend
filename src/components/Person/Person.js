import PropTypes from 'prop-types';
import React from 'react';
import styles from './Person.scss';
import classnames from 'classnames';
import Avatar from 'components/Avatar/index';

export const AvatarPosition = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

export const Person = props => {
  const avatar = <Avatar name={props.name} medium />;

  const cx = classnames.bind(styles);
  const avatarStyle = cx('avatar', props.avatarClass);

  return (
    <span className={styles.Person}>
      {props.avatarPosition === AvatarPosition.LEFT && (
        <span className={styles.left}>
          <span className={avatarStyle}>{avatar}</span>
          <span className={styles.name}>{props.name}</span>
        </span>
      )}
      {props.avatarPosition === AvatarPosition.RIGHT && (
        <span className={styles.right}>
          <span className={styles.name}>{props.name}</span>
          <span className={avatarStyle}>{avatar}</span>
        </span>
      )}
      {props.children}
    </span>
  );
};

Person.propTypes = {
  avatarClass: PropTypes.string,
  avatarPosition: PropTypes.oneOf([AvatarPosition.RIGHT, AvatarPosition.LEFT])
    .isRequired,
  name: PropTypes.string.isRequired,
};

Person.defaultProps = {
  avatarClass: '',
};

export default Person;
