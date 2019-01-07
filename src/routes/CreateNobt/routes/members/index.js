import React from "react";
import AddMembersForm from "./components/AddMembersForm";
import { getNobtName } from "../../modules/selectors";
import withNavigation from "components/hoc/withNavigation";
import LocationBuilder from "../../../App/modules/navigation/LocationBuilder";
import { Route } from "react-router-dom";

export default (store, basePath) => (
	<Route exact path={basePath + "members"} render={withNavigation(({replace, ...props}) => {
		let previousStepIncomplete = !getNobtName(store.getState());

		if (previousStepIncomplete) {
			LocationBuilder.fromWindow().pop().push("name").apply(replace);
			return null;
		}
		else {
			return <AddMembersForm replace {...props}/>;
		}
	})} />
);