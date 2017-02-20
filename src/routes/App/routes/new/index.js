import AddBillFormContainer from "./containers/AddBillFormContainer";
import SelectDebteeRoute from "./routes/debtee";
import withNavigation from "../../../../components/hoc/withNavigation";

export default {
  path: 'newBill',
  component: withNavigation(AddBillFormContainer),
  childRoutes: [
    SelectDebteeRoute
  ]
}
