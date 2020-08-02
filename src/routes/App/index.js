import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import useSWR from 'swr';
import Client from '../../api';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { UPDATE_FETCH_NOBT_STATUS } from './modules/currentNobt/actions';
import { AsyncActionStatus } from '../../const/AsyncActionStatus';
import AppLayout from '../../layouts/AppLayout';
import UnknownNobt from '../../components/UnknownNobt/UnknownNobt';
import { Snackbar } from 'react-toolbox-legacy/lib/snackbar';
import LoadingNobt from '../../components/LoadingNobt/LoadingNobt';
import { Nobt, NobtContext } from '../../hooks/useNobt';
import HomeScreen from './components/HomeScreen';
import BalanceOverview from './routes/balances/routes/index/components/BalanceOverview/BalanceOverview';
import PersonBalance from './routes/balances/routes/name/components/PersonBalance';
import HookableRoute from '../../utils/RouteExtensions/HookableRoute';
import { clearAddBillForm } from './routes/bill/modules/actions';
import OverviewPage from './routes/bill/components/OverviewPage';
import DebteePage from './routes/bill/components/DebteePage';
import DebtorsPage from './routes/bill/components/DebtorsPage';
import AmountConversionPage from './routes/bill/components/AmountConversionPage';
import BillDetailPage from './routes/id/components/BillDetailPage';
import {
  balanceDetailPathVariable,
  billDetailPathVariable,
  nobtIdPathVariable,
} from '../../app';
import { useRouteMatch } from 'react-router';

export default function App() {
  const params = useParams();
  const nobtId = params[nobtIdPathVariable];
  const { data: nobt, error, revalidate } = useSWR(nobtId, () =>
    Client.fetchNobt(nobtId).then(response => response.data)
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (nobt) {
      dispatch({
        type: UPDATE_FETCH_NOBT_STATUS,
        payload: {
          nobt,
          status: AsyncActionStatus.SUCCESSFUL,
        },
      });
      document.title = nobt.name;
    }
  }, [nobt]);
  let { path, url } = useRouteMatch();

  if (error) {
    return (
      <AppLayout>
        <UnknownNobt />
        <Snackbar
          action="Retry?"
          active={true}
          label="Failed to fetch nobt."
          type="warning"
          onClick={() => revalidate()}
        />
      </AppLayout>
    );
  }

  if (!nobt) {
    return (
      <AppLayout>
        <LoadingNobt />
      </AppLayout>
    );
  }

  if (nobt) {
    return (
      <AppLayout>
        <NobtContext.Provider value={Nobt.fromServerResponse(nobt)}>
          <Switch>
            <Route exact path={path} component={HomeScreen} />
            <Route
              exact
              path={`${path}/balances`}
              component={BalanceOverview}
            />
            <Route
              exact
              path={`${path}/balances/:${balanceDetailPathVariable}`}
              component={PersonBalance}
            />
            <HookableRoute
              onEnter={() => dispatch(clearAddBillForm())}
              path={`${path}/bill`}
            >
              <Switch>
                <Route
                  exact
                  path={`${path}/bill`}
                  render={() => (
                    <OverviewPage invalidateNobtData={revalidate} />
                  )}
                />
                <Route
                  exact
                  path={`${path}/bill/debtee`}
                  component={DebteePage}
                />
                <Route
                  exact
                  path={`${path}/bill/debtors`}
                  component={DebtorsPage}
                />
                <Route
                  exact
                  path={`${path}/bill/convert`}
                  component={AmountConversionPage}
                />
              </Switch>
            </HookableRoute>
            <Route
              exact
              path={`${path}/:${billDetailPathVariable}`}
              component={BillDetailPage}
            />
          </Switch>
        </NobtContext.Provider>
      </AppLayout>
    );
  }
}
