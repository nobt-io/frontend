import BalanceOverview from "./components/BalanceOverview";
import NameRoute from "./routes/name"
import withNavigation from "../../../../components/hoc/withNavigation";
import EmptyLayout from "../../../../layouts/EmptyLayout";

export default {
  path: "balances",
  component: EmptyLayout,
  indexRoute: {
    component: withNavigation(BalanceOverview)
  },
  childRoutes: [
    NameRoute
  ]
}
