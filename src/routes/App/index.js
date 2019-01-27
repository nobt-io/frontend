import React from 'react';
import HomeScreen from './components/HomeScreen';
import { Redirect, Route, Switch } from 'react-router-dom';
import withNavigation from '../../components/hoc/withNavigation';
import PersonBalance from './routes/balances/routes/name/components/PersonBalance';
import BalanceOverview from './routes/balances/routes/index/components/BalanceOverview/BalanceOverview';
import DebteePage from './routes/bill/components/DebteePage';
import DebtorsPage from './routes/bill/components/DebtorsPage';
import BillDetailPage from './routes/id/components/BillDetailPage';
import NobtLoader from '../../components/NobtLoader/NobtLoader';
import { clearAddBillForm } from './routes/bill/modules/actions';
import HookableRoute from '../../utils/RouteExtensions/HookableRoute';
import LegacyAppLayout from '../../layouts/AppLayout/AppLayout';
import AmountConversionPage from './routes/bill/components/AmountConversionPage';
import BillPage from "./pages/bill/BillPage";

export const balanceDetailPathVariable = 'name';
export const billDetailPathVariable = 'billId';

export default ({dispatch}) => {
  return (
    <Route
      path={'/:nobtId'}
      render={() => (
        <NobtLoader>
          <Switch>
            <Route exact path={'/:nobtId'} component={withLegacyAppLayout(HomeScreen)} />
            <Route exact path={'/:nobtId/balances'} component={withLegacyAppLayout(withNavigation(BalanceOverview))} />
            <Route exact path={'/:nobtId/balances/:name'} component={withLegacyAppLayout(withNavigation(PersonBalance))} />
            <HookableRoute onEnter={() => dispatch(clearAddBillForm())} path={'/:nobtId/bill'}>
              <Switch>
                <Route exact path={'/:nobtId/bill'} component={BillPage} />
                <Route exact path={'/:nobtId/bill/debtee'} component={withLegacyAppLayout(DebteePage)} />
                <Route exact path={'/:nobtId/bill/debtors'} component={withLegacyAppLayout(DebtorsPage)} />
                <Route exact path={'/:nobtId/bill/convert'} component={withLegacyAppLayout(AmountConversionPage)} />
              </Switch>
            </HookableRoute>
            <Route exact path={'/:nobtId/:billId'} component={withLegacyAppLayout(withNavigation(BillDetailPage))} />
            <Redirect from={'/:nobtId'} to={'/:nobtId'} />
          </Switch>
        </NobtLoader>
      )}
    />
  );
};

function withLegacyAppLayout(WrappedComponent) {
  class PropsProxy extends React.Component {
    static displayName = 'legacyAppLayout';

    render() {
      return <LegacyAppLayout><WrappedComponent {...this.props} /></LegacyAppLayout>;
    }
  }

  return PropsProxy;
}
