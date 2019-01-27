import { StyledComponentProps, withStyles, Theme } from '@material-ui/core';
import React from 'react';
import { StyleRules } from '@material-ui/core/styles';

const component: React.SFC<StyledComponentProps> = ({ children, classes = {} }) => (
  <div className={classes.container}>{children}</div>
);

const style = (theme: Theme): StyleRules => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px`,
    textAlign: 'center',
  },
});

export default withStyles(style)(component);
