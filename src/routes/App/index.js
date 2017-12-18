import withNobtLoader from "../../components/NobtLoader/withNobtLoader";
import NewBillRoute from "./routes/new";
import DetailRoute from "./routes/id";
import BalancesRoute from "./routes/balances";
import reducer from "./modules/reducers";
import { injectReducer } from "../../store/reducers";
import AppLayout from "../../layouts/AppLayout";
import HomeScreen from "./components/HomeScreen";

export default (store) => {

  injectReducer(store, {key: 'App', reducer});

  return {
    path: ':nobtId',
    component: withNobtLoader(AppLayout),
    indexRoute: {
      component: HomeScreen
    },
    childRoutes: [
      NewBillRoute,
      BalancesRoute,
      DetailRoute,
    ]
  }
}
