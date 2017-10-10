import PersonBalance from "./components/PersonBalance";
import EmptyLayout from "../../../../../../layouts/EmptyLayout";
import withNavigation from "../../../../../../components/hoc/withNavigation";

export const pathVariable = "name";

export default {
  path: `:${pathVariable}`,
  component: EmptyLayout,
  indexRoute: {
    component: withNavigation(PersonBalance)
  },
}
