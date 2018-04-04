import React from "react";
import ReactDOM from "react-dom";
import createBrowserHistory from "history/lib/createBrowserHistory";
import { Router, useRouterHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import createStore from "./store/createStore";
import attachStoreStateFactory from "./store/attachStoreStateFactory";
import { IntlProvider } from "react-intl";
import routeFactory from "./routes";
// noinspection ES6UnusedImports
import globalCss from "./app.scss"
import theme from "./styles/custom-component-themes";
import { Provider } from "react-redux";
import { ThemeProvider } from "react-css-themr";

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

ReactDOM.render(
	<IntlProvider locale={navigator.language}>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<Router history={history} children={routes} />
			</Provider>
		</ThemeProvider>
	</IntlProvider>,
	MOUNT_NODE
);