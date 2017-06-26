import IndexRoute from "./routes/index"
import NameRoute from "./routes/name";
import EmptyLayout from "../../../../layouts/EmptyLayout";

export default {
  path: "balances",
  component: EmptyLayout,
  indexRoute: IndexRoute,
  childRoutes: [
    NameRoute
  ]
}
