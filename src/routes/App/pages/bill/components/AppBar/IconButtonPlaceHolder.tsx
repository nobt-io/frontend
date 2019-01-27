import { StyledComponentProps, withStyles } from '@material-ui/core';
import Icon from '@material-ui/core/Icon/Icon';
import IconButton from '@material-ui/core/IconButton/IconButton';
import React from 'react';
import { StyleRules } from '@material-ui/core/styles';

const style: StyleRules = {
  root: {
    marginLeft: -12,
    marginRight: 20,
    visibility: 'hidden',
  },
};

const component: React.SFC<StyledComponentProps> = ({ classes = {} }) => (
  <IconButton className={classes.root} disabled={true} color="inherit">
    <Icon>arrow_back</Icon>
  </IconButton>
);
export default withStyles(style)(component);
