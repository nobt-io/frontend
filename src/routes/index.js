import CoreLayout from "../layouts/CoreLayout";
import LandingPageRouteFactory from "./Landing";
import { Route, Router, Switch } from "react-router-dom";
import HomeScreen from "./App/components/HomeScreen";
import AppLayout from "../layouts/AppLayout";
import React from "react";
import withNavigation from "../components/hoc/withNavigation";
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
/*
    {
  path: '/',
  component: CoreLayout,
  indexRoute: LandingPageRoute,
  childRoutes: [
    CreateNobtRouteFactory(store),
    AppRouteFactory(store)
  ]
})
*/