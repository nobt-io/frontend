import withNobtLoader from "../../components/hoc/withNobtLoader";
import NobtContainer from "./containers/NobtContainer";
import NewBillRoute from "./routes/new";
import DetailRoute from "./routes/id";
import SortOverlayRoute from "./routes/sort";
import FilterOverlayRoute from "./routes/filter";
import CoreLayout from "../../layouts/CoreLayout/CoreLayout";
import reducer from "./modules/reducers";
import { injectReducer } from "../../store/reducers";


export default (store) => {

  injectReducer(store, {key: 'App', reducer});

  return {
    path: ':nobtId',
    component: withNobtLoader(CoreLayout),
    indexRoute: {
      component: NobtContainer
    },
    childRoutes: [
      NewBillRoute,
      SortOverlayRoute,
      FilterOverlayRoute,
      DetailRoute,
    ]
  }
}
