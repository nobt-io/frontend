import {combineReducers} from "redux"

// Combine our reducers out here because we don't want to combine them on a per-route basis.
// Reducers are grouped by data that is independent from each other but routes may access the same data.
import currentNobt from "./routes/Nobt/modules/currentNobt/reducer"
import viewState from "./routes/Nobt/modules/viewState/reducer"

let reducer = combineReducers({
  currentNobt,
  viewState
});

export default reducer;
