import NobtContainer from "./containers/NobtContainer";
import AddBillFormContainer from "./routes/AddBillForm"
import CoreLayout from "layouts/CoreLayout/CoreLayout";
import withNobtLoader from "layouts/NobtLoader"

export default {
  path: ':id',
  component: withNobtLoader(CoreLayout),
  indexRoute: {
    component: NobtContainer
  },
  childRoutes: [
    AddBillFormContainer
  ]
}
