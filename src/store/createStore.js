import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import { routerMiddleware, routerReducer as router } from "react-router-redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import { crashReporter } from "./crashReporter";
import createNobtForm from "../routes/CreateNobt/modules/reducer";
import currentNobt from "../routes/App/modules/currentNobt/reducer";
import addBillForm from "../routes/App/routes/bill/modules/reducer";

export default (initialState = {}, history) => {

	const middleware = [ crashReporter, thunk, routerMiddleware(history) ]

	if (__DEV__) {
		const logger = createLogger();
		middleware.push(logger);
	}

	const enhancers = []
	if (__DEV__) {
		const devToolsExtension = window.devToolsExtension
		if (typeof devToolsExtension === 'function') {
			enhancers.push(devToolsExtension())
		}
	}

	const reducer = combineReducers({
		createNobtForm,
		App: combineReducers({
			currentNobt,
			addBillForm
		}),
		router
	});

	const store = createStore(
		reducer,
		initialState,
		compose(
			applyMiddleware(...middleware),
			...enhancers
		)
	)

	store.asyncReducers = {}

	return store
}
