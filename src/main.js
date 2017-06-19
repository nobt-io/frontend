if (!__DEBUG__) {
  Raven.config("https://bbc41d462f564d7e8f061eaf89c41e20@sentry.io/104728", {
    release: COMMIT_HASH
  }).install();
}

import React from "react";
import ReactDOM from "react-dom";
import createBrowserHistory from "history/lib/createBrowserHistory";
import { useRouterHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import createStore from "./store/createStore";
import { IntlProvider } from "react-intl";
import routeFactory from "routes";

// ========================================================
// Browser History Setup
// ========================================================
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
})

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
});

let routes = routeFactory(store);

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEBUG__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {


  require.ensure([], (require) => {

    const AppContainer = require("./containers/AppContainer").default

    ReactDOM.render(
      <IntlProvider locale={navigator.language}>
        <AppContainer
          store={store}
          history={history}
          routes={routes}
        />
      </IntlProvider>,
      MOUNT_NODE
    )
  });
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    module.hot.accept()
  }
}

// ========================================================
// Go!
// ========================================================
render()
