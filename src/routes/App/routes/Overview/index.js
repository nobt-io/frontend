import NobtContainer from "./containers/NobtContainer";
import AddBillFormContainer from "./routes/AddBillForm"
import CoreLayout from "layouts/CoreLayout/CoreLayout";

export default {
  path: ':id',
  component: CoreLayout,
  indexRoute: {
    component: NobtContainer
  },
  childRoutes: [
    AddBillFormContainer
  ]
}
