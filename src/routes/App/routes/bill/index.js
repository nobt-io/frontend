import BillWizardContainer from "./containers/BillWizardContainer";
import OverviewComponent from "./components/Overview"
import DebteeRoute from "./routes/debtee"
import DebtorsRoute from "./routes/debtors"

export default ({dispatch}) => ({
  path: 'bill',
  component: BillWizardContainer,
  onEnter: () => dispatch({type: "ClearAddBillForm"}),
  indexRoute: {
    component: OverviewComponent
  },
  childRoutes: [
    DebteeRoute,
    DebtorsRoute
  ]
});
