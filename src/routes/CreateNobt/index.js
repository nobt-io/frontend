import WizardContainer from "./containers/WizardContainer";
import NameRoute from "./routes/name";
import MembersRouteFactory from "./routes/members";
import DoneRoute from "./routes/done";
import LocationBuilder from "../App/modules/navigation/LocationBuilder";

export default (store) => {

  return {
    path: 'create',
    component: WizardContainer,
    indexRoute: {
      onEnter: (nextState, replace) => LocationBuilder.fromWindow().push("name").apply(replace)
    },
    childRoutes: [
      NameRoute,
      MembersRouteFactory(store),
      DoneRoute(store)
    ]
  }
}
