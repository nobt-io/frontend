import React from "react";
import styles from "./HomeScreen.scss";
import EmptyNobtPlaceholder from "../EmptyNobtPlaceholder/index";
import { FontIcon } from "react-toolbox/lib/font_icon";
import AddBillFAB from "../AddBillFAB/index";
import NobtItButtonTheme from "./NobtItButtonTheme.scss";
import { Button } from "react-toolbox/lib/button/index";
import Amount from "../../../../components/Amount/Amount";
import BrandedAppBar from "../../../../components/BrandedAppBar/index";
import Feed from "../Feed/Feed";
import { getCreatedOn, getCurrency, getDeNormalizedBills, getMembers, getName, getTotal, isNobtEmpty } from "../../modules/currentNobt/selectors";
import { connect } from "react-redux";
import { invalidateNobt } from "../../modules/currentNobt/actions";
import Link from "../../../../components/nav/Link";

const GoToBalancesButton = () => (
	<Link to={ id => `/${id}/balances` }>
		<Button
			label="Show balances"
			primary
			raised
			theme={NobtItButtonTheme}
		/>
	</Link>
);

const HomeScreen = ({name, total, members, isNobtEmpty}) => (
	<div className={styles.homeScreen}>
		<BrandedAppBar />

		<div className={styles.overviewContainer}>
			<div className={styles.nobtTitle}>{name}</div>
			<div className={styles.nobtMetadata}>
				<ul>
					<li>
						<div><FontIcon value="payment" /><Amount value={total} /></div>
					</li>
					<li>
						<div><FontIcon value="group" />{members.length}</div>
					</li>
				</ul>
			</div>
			{!isNobtEmpty && <GoToBalancesButton />}
		</div>

		{
			isNobtEmpty ? <EmptyNobtPlaceholder /> : <Feed />
		}

		<AddBillFAB />
	</div>
);

const mapStateToProps = (state) => ({
	name: getName(state),
	currency: getCurrency(state),
	total: getTotal(state),
	members: getMembers(state),
	bills: getDeNormalizedBills(state),
	createdOn: getCreatedOn(state),
	isNobtEmpty: isNobtEmpty(state)
});

const mapDispatchToProps = (dispatch, props) => ({
	invalidateNobtData: () => dispatch(invalidateNobt())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
