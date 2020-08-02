import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import createStore from './store/createStore';
import { IntlProvider } from 'react-intl';
// noinspection ES6UnusedImports
import globalCss from './app.scss';
import theme from './styles/custom-component-themes';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-css-themr';
import { MuiThemeProvider } from '@material-ui/core/styles';
import muiTheme from 'styles/muiTheme';
import { wrapHistory } from 'oaf-react-router';
import LandingPage from './routes/Landing/components/LandingPage';
import WizardContainer from './routes/CreateNobt/containers/WizardContainer';
import BasicInformationForm from './routes/CreateNobt/routes/name/components/BasicInformationForm';
import AddMembersForm from './routes/CreateNobt/routes/members/components/AddMembersForm/AddMembersForm';
import DoneScreen from './routes/CreateNobt/routes/done/components/DoneScreen/DoneScreen';
import App from './routes/App';

const history = createBrowserHistory();
wrapHistory(history);

const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState);

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

if (!IS_PRODUCTION_BUILD) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open();
  }
}

const MOUNT_NODE = document.getElementById('root');
export const balanceDetailPathVariable = 'name';
export const billDetailPathVariable = 'billId';
export const nobtIdPathVariable = 'nobtId';

ReactDOM.render(
  <IntlProvider locale={navigator.language}>
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route exact path={'/'} component={LandingPage} />;
              <Route
                path={'/create/'}
                render={() => (
                  <WizardContainer>
                    <Switch>
                      <Route
                        exact
                        path={'/create/name'}
                        component={BasicInformationForm}
                      />
                      <Route
                        exact
                        path={'/create/members'}
                        component={AddMembersForm}
                      />
                      <Route
                        exact
                        path={'/create/done'}
                        component={DoneScreen}
                      />
                      <Redirect from={'/create'} to={'/create/name'} />
                    </Switch>
                  </WizardContainer>
                )}
              />
              <Route path={`/:${nobtIdPathVariable}`} component={App} />
            </Switch>
          </Router>
        </Provider>
      </ThemeProvider>
    </MuiThemeProvider>
  </IntlProvider>,
  MOUNT_NODE
);
