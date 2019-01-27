import {withStyles, Theme, StyledComponentProps, StyleRules} from '@material-ui/core/styles';
import React from 'react';
import classNames from 'classnames';

interface Props extends StyledComponentProps {
    primary?: boolean;
}

const component: React.SFC<Props> = ({children, classes = {}, primary = false}) => (
    <div className={classNames(classes.root, {['primary']: primary})}>
        <div className={classes.container}>{children}</div>
    </div>
);

const style = (theme: Theme): StyleRules => ({

    // set html-style to 16 as it is set to 10px by the used global bootstrap.
    '@global': {
        html: {
            fontSize: 16
        }
    },

    root: {
        height: '100%',
        width: '100%',
        position: 'fixed',
        overflow: 'scroll',
        background: theme.palette.grey['100'],

        [theme.breakpoints.up('md')]: {
            background: theme.palette.primary.main,
        },
        '&.primary': {
            background: theme.palette.primary.main,
        },
    },
    container: {
        maxWidth: theme.breakpoints.values.md,

        [theme.breakpoints.up('md')]: {
            margin: '40px auto',
            overflow: 'hidden',
        },
    },
});

export default withStyles(style)(component);
