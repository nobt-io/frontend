import CoreLayout from "../layouts/CoreLayout";
import LandingPageRouteFactory from "./Landing";
import { Switch } from "react-router-dom";
import React from "react";
import CreateNobtRouteFactory from "./CreateNobt/index"
import AppRouteFactory from "./App/index"

export default (store) => (
	<CoreLayout>
		<Switch>
			{LandingPageRouteFactory(store)}
			{CreateNobtRouteFactory(store)}
			{AppRouteFactory(store)}
		</Switch>
	</CoreLayout>
)