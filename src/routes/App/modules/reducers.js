import { combineReducers } from "redux"
// Combine our reducers out here because we don't want to combine them on a per-route basis.
// Reducers are grouped by data that is independent from each other but routes may access the same data.
import currentNobt from "./currentNobt/reducer"
import { addBillFormReducer } from "../routes/bill/modules/reducer";

export default combineReducers({
  currentNobt,
  addBillForm: addBillFormReducer
})
