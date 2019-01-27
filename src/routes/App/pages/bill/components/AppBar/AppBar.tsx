import AppBar from '@material-ui/core/AppBar';
import { withStyles, Theme, StyledComponentProps, StyleRules } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import BackButton from './BackButton';
import IconButtonPlaceHolder from './IconButtonPlaceHolder';
import { History } from 'history';
import { CustomTheme } from '../../../../../../styles/muitheme';
import {CSSProperties} from "@material-ui/core/styles/withStyles";

interface Props extends StyledComponentProps {
  history: History;
  noNavigation?: boolean;
}

const component: React.SFC<Props> = ({ history, noNavigation = false, classes = {} }) => (
  <div>
    <StyledAppBar>
      <Toolbar>
        {noNavigation ? <IconButtonPlaceHolder /> : <BackButton history={history} />}
        <Typography className={classes.label}>nobt.io</Typography>
        <IconButtonPlaceHolder />
      </Toolbar>
    </StyledAppBar>
    <div className={classes.spacer} />
  </div>
);

const StyledAppBar = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none',
    [theme.breakpoints.up('md')]: {
      position: 'static',
    } as CSSProperties,
  },
}))(AppBar);

const style = (theme: Theme): StyleRules => ({
  toolbar: {
    justifyContent: 'center',
  },
  label: {
    flexGrow: 2,
    textAlign: 'center',
    fontFamily: (theme as CustomTheme).custom.highlightFont,
    color: theme.palette.primary.contrastText,
  },
  spacer: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

export default withStyles(style)(component);
