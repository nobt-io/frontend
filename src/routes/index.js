import CoreLayout from "../layouts/CoreLayout";
import LandingPageRoute from "./Landing";
import AppRouteFactory from "./App";
import CreateNobtRouteFactory from "./CreateNobt"

export default (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: LandingPageRoute,
  childRoutes: [
    CreateNobtRouteFactory(store),
    AppRouteFactory(store)
  ]
})
