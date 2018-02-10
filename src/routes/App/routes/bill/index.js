import BillWizardContainer from "./containers/BillWizardContainer";
import OverviewPage from "./components/OverviewPage"
import DebtorsPage from "./components/DebtorsPage"
import DebteePage from "./components/DebteePage";

export default ({dispatch}) => ({
  path: 'bill',
  component: BillWizardContainer,
  onEnter: () => dispatch({type: "ClearAddBillForm"}),
  indexRoute: {
    component: OverviewPage
  },
  childRoutes: [
    {
      path: 'debtee',
      component: DebteePage,
    },
    {
      path: 'debtors',
      component: DebtorsPage ,
    }
  ]
});
