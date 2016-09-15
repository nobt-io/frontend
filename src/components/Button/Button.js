import React from 'react'
import classes from './Button.scss'
import {Button} from 'react-toolbox/lib/button';

export const Btn = (props) => (
  <Button target='_blank' icon={props.icon}>{props.children}</Button>
);

export default Btn
