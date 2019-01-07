import React from "react";
import DoneScreen from "./components/DoneScreen";
import withNavigation from "components/hoc/withNavigation";
import { getCreatedNobtId, getNobtName } from "../../modules/selectors";
import LocationBuilder from "../../../App/modules/navigation/LocationBuilder";
import { Route } from "react-router-dom";

export default (store, basePath) => (
	<Route exact path={basePath + "done"} render={withNavigation(({replace, ...props}) => {
		let previousStepIncomplete = !getCreatedNobtId(store.getState());

		if (previousStepIncomplete) {
			LocationBuilder.fromWindow().pop().push("name").apply(replace);
			return null;
		}
		else {
			return <DoneScreen {...props}/>;
		}
	})} />
);
