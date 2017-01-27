import mockStore from "redux-mock-store";
import { aStoreState } from "./mockState";

/**
 * @param {function(StateBuilder):StateBuilder} stateModifier
 */
export default ( stateModifier = (state) => (state), middlewares = [] ) => {

  let modifiedState = stateModifier(aStoreState);

  return mockStore(middlewares)(modifiedState.build())
};
