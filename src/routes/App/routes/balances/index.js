import BalanceOverview from "./components/BalanceOverview";
import withNavigation from "../../../../components/hoc/withNavigation";

export default {
  path: "balances",
  component: withNavigation(BalanceOverview),
}
