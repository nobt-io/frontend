import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import createNobtForm from "../routes/CreateNobt/modules/reducer";

export const makeRootReducer = (asyncReducers) => {
	return combineReducers({
		createNobtForm,
		router,
		...asyncReducers
	})
}

export const injectReducer = (store, {key, reducer}) => {
	store.asyncReducers[ key ] = reducer
	store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
