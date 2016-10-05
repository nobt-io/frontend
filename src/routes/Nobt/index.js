import SimpleLayout from "layouts/SimpleLayout";
import OverviewRoute from "./routes/Overview";
import AddExpenseRoute from "./routes/AddExpense";

export default (store) => ({
  path: 'nobt/',
  component: SimpleLayout,
  childRoutes: [
    AddExpenseRoute(store),
    OverviewRoute(store)
  ]
})
