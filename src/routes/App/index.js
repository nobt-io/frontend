import React from "react";
import HomeScreen from "./components/HomeScreen";
import { Switch, Route, Redirect } from 'react-router-dom';
import withNavigation from "../../components/hoc/withNavigation";
import PersonBalance from "./routes/balances/routes/name/components/PersonBalance";
import BalanceOverview from "./routes/balances/routes/index/components/BalanceOverview/BalanceOverview";
import OverviewPage from "./routes/bill/components/OverviewPage";
import DebteePage from "./routes/bill/components/DebteePage";
import DebtorsPage from "./routes/bill/components/DebtorsPage";
import BillDetailPage from "./routes/id/components/BillDetailPage";
import NobtLoader from "../../components/NobtLoader/NobtLoader";

export const balanceDetailPathVariable = "name";
export const billDetailPathVariable = "billId";

export default () => {
	return (
		<Route path={"/:nobtId"} render={() => (
			<NobtLoader>
				<Switch>
					<Route exact path={"/:nobtId"} component={HomeScreen} />
					<Route exact path={"/:nobtId/balances"} component={withNavigation(BalanceOverview)} />
					<Route exact path={"/:nobtId/balances/:name"} component={withNavigation(PersonBalance)} />
					<Route exact path={"/:nobtId/bill"} component={OverviewPage} />
					<Route exact path={"/:nobtId/bill/debtee"} component={DebteePage} />
					<Route exact path={"/:nobtId/bill/debtors"} component={DebtorsPage} />
					<Route exact path={"/:nobtId/:billId"} component={withNavigation(BillDetailPage)} />
				</Switch>
			</NobtLoader>
		)} />
	)
};
