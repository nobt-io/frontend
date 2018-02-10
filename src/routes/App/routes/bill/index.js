import BillWizardContainer from "./containers/BillWizardContainer";
import OverviewPage from "./components/OverviewPage"
import DebtorsPage from "./components/DebtorsPage"
import DebteePage from "./components/DebteePage";
import { clearAddBillForm } from "./modules/actions";

export default ({dispatch}) => ({
  path: 'bill',
  component: BillWizardContainer,
  onEnter: () => dispatch(clearAddBillForm()),
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
