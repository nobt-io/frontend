import PersonBalance from "./components/PersonBalance";
import EmptyLayout from "../../../../../../layouts/EmptyLayout";
import withNavigation from "../../../../../../components/hoc/withNavigation";

const pathVariable = "name";
exports.pathVariable = pathVariable;

export default {
  path: `:${pathVariable}`,
  component: EmptyLayout,
  indexRoute: {
    component: withNavigation(PersonBalance)
  },
}
