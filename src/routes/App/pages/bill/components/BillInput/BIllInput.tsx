import React, { ChangeEvent } from 'react';
import {
  createMuiTheme,
  InputAdornment,
  MuiThemeProvider,
  StyledComponentProps,
  TextField,
  Theme,
  withStyles,
} from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';
import palette from '../../../../../../styles/muitheme';

interface Props extends StyledComponentProps {
  label: string;
  placeholder: string;
  currency?: boolean;
  onChange: (value: string) => void;
  value: string | null;
}

const component: React.SFC<Props> = ({ classes = {}, label, placeholder, value, onChange, currency = false }) => {
  const changeEvent: React.ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={classes.container}>
      <MuiThemeProvider theme={textFieldTheme}>
        <TextField
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
            shrink: true,
          }}
          InputProps={{
            startAdornment: currency ? <InputAdornment position="start">€</InputAdornment> : null,
            type: currency ? 'number' : 'text',
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
              legend: classes.legend,
            },
          }}
          id="custom-css-outlined-input"
          variant="outlined"
          label={label}
          placeholder={placeholder}
          onChange={changeEvent}
          value={value || ''}
          error={!value && value !== null}
          fullWidth
          required
        />{' '}
      </MuiThemeProvider>
    </div>
  );
};

const color = palette.palette.primary.contrastText;

export const textFieldTheme: Theme = createMuiTheme({
  ...palette,
  palette: {
    primary: {
      main: color,
    },
    secondary: {
      main: color,
    },
    text: {
      primary: color,
      secondary: color,
    },
    type: 'light',
  },
  typography: { useNextVariants: true } as any,
} as any);

const style = (theme: Theme): StyleRules => {
  return {
    container: {
      margin: theme.spacing.unit * 5,
    },
    cssLabel: {
      '&$cssFocused': {
        color: `${color}`,
      },
    },
    cssFocused: {},
    cssUnderline: {
      '&:after': {
        borderBottomColor: color,
      },
    },
    cssOutlinedInput: {
      fontSize: '1.25rem',
      width: 'auto !important',
      '&$cssFocused $notchedOutline': {
        borderWidth: '1px',
        borderStyle: 'solid',
      },
      '& legend': {
        border: 0,
      },
    },
    notchedOutline: {
      borderBottomColor: color,
      borderStyle: 'dashed',
      borderColor: color,
    },
  };
};

export default withStyles(style)(component);
