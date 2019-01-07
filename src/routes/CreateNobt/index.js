import WizardContainer from "./containers/WizardContainer";
import NameRoute from "./routes/name";
import MembersRouteFactory from "./routes/members";
import DoneRouteFactory from "./routes/done";
import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";

export default () => {

	const path = "/create/";

	return (<Route
		path={path}
		render={props => {
			return (
				<WizardContainer>
					<Switch>
						{NameRoute(path)}
						{MembersRouteFactory(store, path)}
						{DoneRouteFactory(store, path)}
						<Redirect exact from={path} to={path + "name"} />
					</Switch>
				</WizardContainer>
			);
		}}
	/>)
}


