import LandingPageRouteFactory from "./Landing";
import { Switch } from "react-router-dom";
import React from "react";
import CreateNobtRouteFactory from "./CreateNobt/index"
import AppRouteFactory from "./App/index"

export default (store) => (
	<Switch>
		{LandingPageRouteFactory(store)}
		{CreateNobtRouteFactory(store)}
		{AppRouteFactory(store)}
	</Switch>
)