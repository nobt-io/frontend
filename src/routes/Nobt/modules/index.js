import {combineReducers} from "redux"

import currentNobt from "./currentNobt/reducer"
import viewState from "./viewState/reducer"
import newBill from "./newBill/reducer"

let reducer = combineReducers({
  currentNobt,
  viewState,
  newBill
});

export default reducer;
