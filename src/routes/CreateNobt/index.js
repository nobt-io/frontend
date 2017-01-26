import reducer from "./modules/reducer";
import { injectReducer } from "../../store/reducers";
import WizardContainer from "./containers/WizardContainer";
import NameRoute from "./routes/name";
import MembersRoute from "./routes/members";
import LocationBuilder from "../App/modules/navigation/LocationBuilder";

export default (store) => {

  injectReducer(store, {key: 'createNobtForm', reducer});

  return {
    path: 'create',
    component: WizardContainer,
    indexRoute: {
      onEnter: (nextState, replace) => LocationBuilder.fromWindow().push("name").apply(replace)
    },
    childRoutes: [
      NameRoute,
      MembersRoute
    ]
  }
}
