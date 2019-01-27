import { StyledComponentProps, Theme, withStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography/Typography';
import React from 'react';
import { StyleRules } from '@material-ui/core/styles';

const component: React.SFC<StyledComponentProps> = ({ children, classes = {} }) => (
  <Typography variant="h2" className={classes.title}>
    {children}
  </Typography>
);

const style = (theme: Theme): StyleRules => ({
  title: {
    fontSize: '.8rem',
    paddingTop: '.5rem',
    color: fade(theme.palette.primary.contrastText, 0.7),
  },
});

export default withStyles(style)(component);
