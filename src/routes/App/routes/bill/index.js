import BillWizardContainer from "./containers/BillWizardContainer";
import OverviewComponent from "./components/Overview"
import DebteeRoute from "./routes/debtee"
import DebtorsRoute from "./routes/debtors"

export default {
  path: 'bill',
  component: BillWizardContainer,
  indexRoute: {
    component: OverviewComponent
  },
  childRoutes: [
    DebteeRoute,
    DebtorsRoute
  ]
}
