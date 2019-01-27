import { StyledComponentProps, Theme, withStyles } from '@material-ui/core';
import Icon from '@material-ui/core/Icon/Icon';
import IconButton from '@material-ui/core/IconButton/IconButton';
import React from 'react';
import IconButtonPlaceHolder from './IconButtonPlaceHolder';
import { History } from 'history';
import { StyleRules } from '@material-ui/core/styles';

interface Props extends StyledComponentProps {
  history: History;
}

const backButton: React.SFC<Props> = ({ history, classes = {} }) => {
  return canGoBack(history) ? (
    <IconButton className={classes.button} onClick={() => goBack(history)} aria-label="Back">
      <Icon>arrow_back</Icon>
    </IconButton>
  ) : (
    <IconButtonPlaceHolder />
  );
};

const canGoBack = (history: History): boolean => {
  if (!history) {
    return false;
  }
  const currentPath = history.location.pathname;
  const subPath = currentPath.split('/')[2] || null;

  return subPath != null;
};

const goBack = (history: History): void => {
  const currentPath = history.location.pathname;
  const subPaths = currentPath.split('/');

  subPaths.pop();
  const newPath = subPaths.join('/');
  history.push(newPath);
};

const style = (theme: Theme): StyleRules => ({
  button: {
    marginLeft: -12,
    marginRight: 20,
    color: theme.palette.primary.contrastText,
  },
});

export default withStyles(style)(backButton);
