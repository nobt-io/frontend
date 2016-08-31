import React from 'react'
import classes from './Button.scss'
import {Button} from 'react-toolbox/lib/button';

export const Btn = (props) => (
    <Button target='_blank' raised {...props}/>
)

export default Btn
