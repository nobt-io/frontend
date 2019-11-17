import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Router } from 'react-router-dom';
import createStore from './store/createStore';
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

Sentry.init({
  dsn: 'https://bbc41d462f564d7e8f061eaf89c41e20@sentry.io/104728',
  whitelistUrls: [/nobt\.io/],
  beforeSend(event, hint) {
    if (event.exception) {
      Sentry.showReportDialog({ eventId: event.event_id });
    }

    event.extra.store = store.getState();
  },
});

let routes = routeFactory(store);
if (!IS_PRODUCTION_BUILD) {
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
