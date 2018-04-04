import withNobtLoader from "../../components/NobtLoader/withNobtLoader";
import DetailRoute from "./routes/id";
import BillRoute from "./routes/bill";
import BalancesRoute from "./routes/balances";
import AppLayout from "../../layouts/AppLayout";
import HomeScreen from "./components/HomeScreen";

export default (store) => {

  return {
    path: ':nobtId',
    component: withNobtLoader(AppLayout),
    indexRoute: {
      component: HomeScreen
    },
    childRoutes: [
      BillRoute(store),
      BalancesRoute,
      DetailRoute,
    ]
  }
}
