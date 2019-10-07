import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { reduxBreadcrumbs } from './reduxBreadcrumbs';

export default (initialState = {}) => {
  const middleware = IS_PRODUCTION_BUILD ? [reduxBreadcrumbs, thunk] : [thunk];

  const devToolsExtension = window.devToolsExtension;
  const enhancers =
    !IS_PRODUCTION_BUILD && typeof devToolsExtension === 'function'
      ? [devToolsExtension()]
      : [];

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
};
