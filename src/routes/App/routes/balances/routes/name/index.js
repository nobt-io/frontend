import PersonBalance from "./components/PersonBalance";
import EmptyLayout from "../../../../../../layouts/EmptyLayout";
import withNavigation from "../../../../../../components/hoc/withNavigation";

export default {
  path: ":name",
  component: EmptyLayout,
  indexRoute: {
    component: withNavigation(PersonBalance)
  },
}
