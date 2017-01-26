// We only need to import the modules necessary for initial render
import CoreLayout from "../layouts/CoreLayout/CoreLayout";
import LandingRoute from "./Landing";
import AppRouteFactory from "./App";

/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */

export default (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: LandingRoute,
  childRoutes: [
    AppRouteFactory(store)
  ]
})
