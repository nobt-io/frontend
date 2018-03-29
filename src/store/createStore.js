import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import makeRootReducer from "./reducers";
import createLogger from "redux-logger";
import { crashReporter } from "./crashReporter";

export default (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [crashReporter, thunk, routerMiddleware(history)]

	if (__DEV__) {
    const logger = createLogger();
    middleware.push(logger);
  }
  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
	if (__DEV__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
