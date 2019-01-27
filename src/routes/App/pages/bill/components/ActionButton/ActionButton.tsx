import { StyledComponentProps, Theme, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import { StyleRules } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon/Icon';
import * as React from 'react';
import {CustomTheme} from '../../../../../../styles/muitheme';

interface Props extends StyledComponentProps {
    icon?: string;
}

const component: React.SFC<Props> = ({ classes = {}, icon, children }) => (
    <Button className={classes.root}>
        {!!icon && <Icon className={classes.leftIcon}>{icon}</Icon>}
        {children}
    </Button>
);

const style = (theme: Theme): StyleRules => ({
    root: {
        background: (theme as CustomTheme).custom.highlightBackground,
        borderRadius: theme.shape.borderRadius,
        border: 0,
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 5}px`,
        marginTop: '1rem',
        color: theme.palette.secondary.contrastText,
    },
    label: {
        textTransform: 'uppercase',
        fontWeight: theme.typography.fontWeightMedium,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});

export default withStyles(style)(component);
