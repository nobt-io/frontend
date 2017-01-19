import AddBillFormContainer  from './containers/AddBillFormContainer'
import CoreLayout from "../../../../../../layouts/CoreLayout/CoreLayout";

export default {
  path: 'new',
  component: CoreLayout,
  indexRoute: {
    component: AddBillFormContainer
  }
}
