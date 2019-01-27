import { createMuiTheme, Theme } from '@material-ui/core/styles';

const palette: Theme = createMuiTheme({
  breakpoints: {
    values: {
      md: 820,
    },
  },
  custom: {
    highlightBackground: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    highlightFont: "'Comfortaa', 'sans-serif'",
  },
  palette: {
    primary: {
      main: '#3C3298',
    },
    secondary: {
      main: '#373F51',
    },
    type: 'light',
  },

  spacing: {
    unit: 6,
  },
  typography: {
    useNextVariants: true,
  },
} as any);

// tslint:disable-next-line:no-console
console.log('palette', palette);

export interface CustomTheme extends Theme {
  custom: {
    highlightBackground: string;
    highlightFont: string;
  };
}
export default palette;
