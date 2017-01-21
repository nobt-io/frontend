import { createStore, applyMiddleware } from "redux";
import createLogger from "redux-logger";
import { addBillFormReducer } from "./reducer";
import SplitStrategyNames from "const/SplitStrategyNames";

const initialState = {
  debtee: null,
  description: "",
  amount: 0,
  splitStrategy: SplitStrategyNames.EQUAL,
  members: [],
  personValues: [],
};

export default () => {
  const middleware = [];

  if (__DEBUG__) {
    const logger = createLogger();
    middleware.push(logger);
  }

  return createStore(
    addBillFormReducer,
    initialState,
    applyMiddleware(...middleware)
  );
};
