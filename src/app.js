import React from "react";
import ReactDOM from "react-dom";
import createBrowserHistory from "history/lib/createBrowserHistory";
import { useRouterHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import createStore from "./store/createStore";
import attachStoreStateFactory from "./store/attachStoreStateFactory";
import { IntlProvider } from "react-intl";
import routeFactory from "./routes";
import AppContainer from "./containers/AppContainer"

// noinspection ES6UnusedImports
import globalCss from "./app.scss"

const browserHistory = useRouterHistory(createBrowserHistory)();

const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {
	selectLocationState: (state) => state.router
});

// Configure Raven to always attach the current state of the store to the event
let attachStoreState = attachStoreStateFactory(store);
Raven.setDataCallback(attachStoreState);

let routes = routeFactory(store);

if (__DEV__) {
	if (window.devToolsExtension) {
		window.devToolsExtension.open()
	}
}

const MOUNT_NODE = document.getElementById('root');

const render = (AppContainer) => ReactDOM.render(
	<IntlProvider locale={navigator.language}>
		<AppContainer
			key={Math.random()}
			store={store}
			history={history}
			routes={routes}
		/>
	</IntlProvider>,
	MOUNT_NODE
);

render(AppContainer);
