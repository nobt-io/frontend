import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import logger from 'redux-logger';
import { crashReporter } from './crashReporter';
import { routerMiddleware } from 'react-router-redux';

export default (initialState = {}, history) => {
  const reduxRouterMiddleware = routerMiddleware(history);
  const middleware = [crashReporter, thunk, reduxRouterMiddleware];

  if (__DEV__) {
    middleware.push(logger);
  }

  const enhancers = [];
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
};
