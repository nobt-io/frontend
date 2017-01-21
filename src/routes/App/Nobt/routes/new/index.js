import AddBillFormContainer from "./containers/AddBillFormContainer";
import SelectDebteeRoute from "./routes/debtee"
import storeFactory from "./modules/store";
import withProps from "components/hoc/withProps";

export default {
  path: 'newBill',
  component: withProps({ localStore: storeFactory()})(AddBillFormContainer),
  childRoutes: [
    SelectDebteeRoute
  ]
}
