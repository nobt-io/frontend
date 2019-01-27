import * as React from 'react';
import { StyledComponentProps, Theme, withStyles } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';

const component: React.SFC<StyledComponentProps> = ({ classes = {} }) => (
    <div className={classes.container}>
        Paid by{' '}
        <a href="#" className={classes.button}>
            David
        </a>{' '}
        and split{' '}
        <a href="#" className={classes.button}>
            unequally
        </a>{' '}
        .
    </div>
);

const style = (theme: Theme): StyleRules => {
    const color = theme.palette.primary.contrastText;

    return {
        container: {
            margin: `${theme.spacing.unit * 5}px 0`,
            textAlign: 'center',
            color: `${color}`,
            fontSize: theme.typography.body2.fontSize,
        },
        button: {
            padding: theme.spacing.unit,
            fontWeight: theme.typography.fontWeightMedium,
            border: `1px solid ${color}`,
            margin: theme.spacing.unit,
            borderRadius: theme.shape.borderRadius,
            borderStyle: 'dashed',
            color: `${color} !important`,
            textDecoration: 'none',
        },
    };
};

export default withStyles(style)(component);
