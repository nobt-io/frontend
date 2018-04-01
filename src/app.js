import React from "react";
import ReactDOM from "react-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { Redirect, Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import createStore from "./store/createStore";
import attachStoreStateFactory from "./store/attachStoreStateFactory";
import { IntlProvider } from "react-intl";

import theme from 'styles/custom-component-themes';
// noinspection ES6UnusedImports
import globalCss from "./app.scss"
import { ThemeProvider } from "react-css-themr";
import { Provider } from "react-redux";
import LandingPage from "./routes/Landing/index";
import withNavigation from "./components/hoc/withNavigation";
import WizardContainer from "./routes/CreateNobt/containers/WizardContainer/WizardContainer";
import BasicInformationForm from "./routes/CreateNobt/routes/name/index";
import AddMembersForm from "./routes/CreateNobt/routes/members/index";
import { getCreatedNobtId, getNobtName } from "./routes/CreateNobt/modules/selectors";
import DoneScreen from "./routes/CreateNobt/routes/done/DoneScreen";

const browserHistory = createBrowserHistory();

const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState, browserHistory);

// Configure Raven to always attach the current state of the store to the event
let attachStoreState = attachStoreStateFactory(store);
Raven.setDataCallback(attachStoreState);

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
				<ConnectedRouter history={browserHistory}>
					<div>
						<Route exact path="/" component={withNavigation(LandingPage)} />
						<Route exact path="/create" render={() => (<Redirect to="/create/name" />)} />
						<Route path="/create/name" render={() => (
							<WizardContainer>
								<BasicInformationForm />
							</WizardContainer>
						)} />
						<Route path="/create/members" render={() => {

							let previousStepIncomplete = !getNobtName(store.getState());

							return previousStepIncomplete
								? <Redirect to="/create/name" />
								: (
									<WizardContainer>
										<AddMembersForm />
									</WizardContainer>
								);

						}} />
						<Route path="/create/done" render={() => {

							let previousStepIncomplete = !getCreatedNobtId(store.getState());

							return previousStepIncomplete
								? <Redirect to="/create/members" />
								: (
									<WizardContainer>
										<DoneScreen />
									</WizardContainer>
								);
						}} />
					</div>
				</ConnectedRouter>
			</Provider>
		</ThemeProvider>
	</IntlProvider>,
	MOUNT_NODE
)