import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Router } from 'react-router-dom';
import createStore from './store/createStore';
import attachStoreStateFactory from './store/attachStoreStateFactory';
import { IntlProvider } from 'react-intl';
import routeFactory from './routes';
// noinspection ES6UnusedImports
import globalCss from './app.scss';
import theme from './styles/custom-component-themes';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-css-themr';
import { MuiThemeProvider } from '@material-ui/core/styles';
import muiTheme from 'styles/muiTheme';
import { ScrollManager } from 'react-scroll-manager';

const history = createHistory();
const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState, history);

// Configure Raven to always attach the current state of the store to the event
let attachStoreState = attachStoreStateFactory(store);

Raven.setDataCallback(attachStoreState);

let routes = routeFactory(store);
if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open();
  }
}

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <IntlProvider locale={navigator.language}>
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ScrollManager history={history}>
            <Router history={history}>{routes}</Router>
          </ScrollManager>
        </Provider>
      </ThemeProvider>
    </MuiThemeProvider>
  </IntlProvider>,
  MOUNT_NODE
);
