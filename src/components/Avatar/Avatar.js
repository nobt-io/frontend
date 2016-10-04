import React from 'react'
import styles from './Avatar.scss'

const getInitials = (name) => {
  var names = name.split(' ');
  var initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  else if(names[0].length > 1){
    initials += names[0].substring(1, 2).toUpperCase();
  }
  return initials;
};

const colors = ["#929093","#EBDD94","#DA8D93","#BA99B8","#D7B8A3","#CD9775","#DB8F5B","#9E5C5D","#CCD0D1","#A7CCDE","#87A9C5","#255993","#89BFAF","#2EA1B4","#8A8A4C","#587942"];
const colorNameMap = [];

const getColor = (name) => {
  var index = colorNameMap.indexOf(name);
  if(index < 0){
    index = colorNameMap.length;
    colorNameMap.push(name);
  }

  index = index % colors.length;
  return colors[index];
};

export const Avatar = (props) => {
  const initials = getInitials(props.name);
  const nameColor = getColor(props.name);

  const fontSize = props.fontSize == 0 ? 20 : props.fontSize;

  const size = props.size;

  return (<div className={styles.avatar} style={{backgroundColor: nameColor, fontSize: fontSize, lineHeight: size +"px", width: size, height: size}}>{initials}</div>)

};

Avatar.propTypes = {
  name: React.PropTypes.string.isRequired,
  fontSize: React.PropTypes.number.isRequired,
  size: React.PropTypes.number.isRequired,

};

export default Avatar
