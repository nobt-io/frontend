import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import logger from 'redux-logger';
import { reduxBreadcrumbs } from './reduxBreadcrumbs';
import { routerMiddleware } from 'react-router-redux';

export default (initialState = {}, history) => {
  const reduxRouterMiddleware = routerMiddleware(history);
  const middleware = IS_PRODUCTION_BUILD
    ? [reduxBreadcrumbs, thunk, reduxRouterMiddleware]
    : [logger, thunk, reduxRouterMiddleware];

  const devToolsExtension = window.devToolsExtension;
  const enhancers =
    !IS_PRODUCTION_BUILD && typeof devToolsExtension === 'function'
      ? [devToolsExtension()]
      : [];

  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
};
