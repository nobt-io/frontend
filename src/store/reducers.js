import { combineReducers } from 'redux';
import createNobtFormReducer from 'routes/CreateNobt/modules/reducer';
import appReducer from 'routes/App/modules/reducers';

export default combineReducers({
  createNobtForm: createNobtFormReducer,
  App: appReducer,
});
