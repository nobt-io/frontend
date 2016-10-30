import {combineReducers} from "redux"

import currentNobt from "./currentNobt/reducer"
import viewState from "./viewState/reducer"

let reducer = combineReducers({
  currentNobt,
  viewState
});

export default reducer;
