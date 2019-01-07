import PropTypes from 'prop-types';
import React from "react";
import styles from "./Avatar.scss";
import classNames from "classnames"

const getInitials = (name) => {
  var names = name.split(' ');
  var initials = names[ 0 ].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[ names.length - 1 ].substring(0, 1).toUpperCase();
  }
  else if (names[ 0 ].length > 1) {
    initials += names[ 0 ].substring(1, 2).toUpperCase();
  }
  return initials;
};

const colors = [ "#929093", "#EBDD94", "#DA8D93", "#BA99B8", "#D7B8A3", "#CD9775", "#DB8F5B", "#9E5C5D", "#CCD0D1", "#A7CCDE", "#87A9C5", "#255993", "#89BFAF", "#2EA1B4", "#8A8A4C", "#587942" ];
const colorNameMap = [];

const getColor = (name) => {
  var index = colorNameMap.indexOf(name);
  if (index < 0) {
    index = colorNameMap.length;
    colorNameMap.push(name);
  }

  index = index % colors.length;
  return colors[ index ];
};

const Avatar = (props) => {

  const initials = getInitials(props.name);
  const nameColor = getColor(props.name);

  return (
    <div
      data-app-element="avatar"
      className={classNames(styles.avatar, {
        [styles.small]: props.small,
        [styles.medium]: props.medium,
        [styles.large]: props.large,
      })}
      style={{
        backgroundColor: nameColor
      }}>
      {initials}
    </div>
  )

};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  big: PropTypes.bool,
};

export default Avatar
