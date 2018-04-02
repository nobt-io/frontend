import React from "react";
import { connect } from "react-redux";
import { getBalances } from "../../modules/currentNobt/selectors";
import Avatar from "components/Avatar/index";
import { ListItem } from "react-toolbox/lib/list";
import Amount from "components/Amount/Amount";
import { HOList } from "containers/HOList/HOList";
import { IconButton } from "react-toolbox/lib/button";
import AmountTheme from "./themes/AmountTheme.scss";
import { AppBar } from "react-toolbox/lib/app_bar/index";
import { FontIcon } from "react-toolbox/lib/font_icon/index";
import { SubTitle, Title } from "components/text/index";
import { Page } from "components/Container/index";
import Link from "../../../../components/nav/Link";

const BalanceOverview = ({balances}) => (
	<div>

		<AppBar
			leftIcon={
				<Link to={nobtId => `/${nobtId}`}>
					<FontIcon value="chevron_left" />
				</Link>
			}
			rightIcon={<FontIcon />}
			title="Balances"
		/>

		<Page>
			<Title>Balance Overview</Title>
			<SubTitle>The balances of all users in this Nobt.</SubTitle>

			<HOList
				items={balances}
				renderItem={(balance) => (
					<Link to={`balances/${balance.me.name}`}>
						<ListItem
							leftActions={[
								<Avatar name={balance.me.name} medium />
							]}
							key={balance.me.name}
							caption={balance.me.name}
							legend={<Amount theme={AmountTheme} value={balance.me.amount} absolute={false} />}
							rightActions={[
								(<IconButton icon="chevron_right" />),
							]}
						/>
					</Link>
				)}
			/>
		</Page>

	</div>
);

export default connect(
	(state) => ({
		balances: getBalances(state)
	}),
	{}
)(BalanceOverview)
