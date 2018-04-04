import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import createNobtFormReducer from "routes/CreateNobt/modules/reducer";
import appReducer from "routes/App/modules/reducers";

const makeRootReducer = asyncReducers => {
  return combineReducers({
    createNobtForm: createNobtFormReducer,
    App: appReducer,
    router,
    ...asyncReducers
  });
};

export default makeRootReducer;
