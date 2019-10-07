import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import LandingPage from './Landing/components/LandingPage';
import WizardContainer from './CreateNobt/containers/WizardContainer';
import BasicInformationForm from './CreateNobt/routes/name/components/BasicInformationForm';
import AddMembersForm from './CreateNobt/routes/members/components/AddMembersForm/AddMembersForm';
import DoneScreen from './CreateNobt/routes/done/components/DoneScreen/DoneScreen';
import AppLayout from '../layouts/AppLayout';
import NobtLoader from '../components/NobtLoader/NobtLoader';
import HomeScreen from './App/components/HomeScreen';
import BalanceOverview from './App/routes/balances/routes/index/components/BalanceOverview/BalanceOverview';
import PersonBalance from './App/routes/balances/routes/name/components/PersonBalance';
import HookableRoute from '../utils/RouteExtensions/HookableRoute';
import { clearAddBillForm } from './App/routes/bill/modules/actions';
import OverviewPage from './App/routes/bill/components/OverviewPage';
import DebteePage from './App/routes/bill/components/DebteePage';
import DebtorsPage from './App/routes/bill/components/DebtorsPage';
import AmountConversionPage from './App/routes/bill/components/AmountConversionPage';
import BillDetailPage from './App/routes/id/components/BillDetailPage';

export const balanceDetailPathVariable = 'name';
export const billDetailPathVariable = 'billId';

export default store => (
  <Switch>
    <Route exact path={'/'} component={LandingPage} />;
    <Route
      path={'/create/'}
      render={() => (
        <WizardContainer>
          <Switch>
            <Route
              exact
              path={'/create/name'}
              component={BasicInformationForm}
            />
            <Route exact path={'/create/members'} component={AddMembersForm} />
            <Route exact path={'/create/done'} component={DoneScreen} />
            <Redirect from={'/create'} to={'/create/name'} />
          </Switch>
        </WizardContainer>
      )}
    />
    <Route
      path={'/:nobtId'}
      render={() => (
        <AppLayout>
          <NobtLoader>
            <Switch>
              <Route exact path={'/:nobtId'} component={HomeScreen} />
              <Route
                exact
                path={'/:nobtId/balances'}
                component={BalanceOverview}
              />
              <Route
                exact
                path={`/:nobtId/balances/:${balanceDetailPathVariable}`}
                component={PersonBalance}
              />
              <HookableRoute
                onEnter={() => store.dispatch(clearAddBillForm())}
                path={'/:nobtId/bill'}
              >
                <Switch>
                  <Route
                    exact
                    path={'/:nobtId/bill'}
                    component={OverviewPage}
                  />
                  <Route
                    exact
                    path={'/:nobtId/bill/debtee'}
                    component={DebteePage}
                  />
                  <Route
                    exact
                    path={'/:nobtId/bill/debtors'}
                    component={DebtorsPage}
                  />
                  <Route
                    exact
                    path={'/:nobtId/bill/convert'}
                    component={AmountConversionPage}
                  />
                </Switch>
              </HookableRoute>
              <Route
                exact
                path={`/:nobtId/:${billDetailPathVariable}`}
                component={BillDetailPage}
              />
              <Redirect from={'/:nobtId'} to={'/:nobtId'} />
            </Switch>
          </NobtLoader>
        </AppLayout>
      )}
    />
  </Switch>
);
