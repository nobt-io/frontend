import { createMuiTheme } from '@material-ui/core/styles';

// this values have been copied over from react-toolbox
// once we full transitioned to material-ui, we may want
// to adjust these values (and use the onces computed from `main`?)
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2d978d',
      dark: 'rgba(53, 53, 53, 50)',
      light: '#34aca1',
    },
    secondary: {
      light: '#e3e3e3',
      main: '#979797',
      dark: 'white',
    },
    error: {
      main: '#de3226',
    },
  },
});

export default theme;
