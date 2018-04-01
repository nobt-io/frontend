import * as React from "react";
import { Input } from "react-toolbox/lib/input";
import ContinueButton from "../../components/ContinueButton/index";
import { Dropdown } from "react-toolbox/lib/dropdown";
import styles from "./BasicInformationForm.scss";
import NobtNameInputTheme from "./NobtNameInputTheme.scss";
import NobtCurrencyDropdownTheme from "./NobtCurrencyDropdownTheme.scss";
import { connect } from "react-redux";
import { getCurrency, getNobtName } from "../../modules/selectors";
import { changeNobtName, selectCurrency } from "../../modules/actions";
import { Link } from "react-router-dom"

const currencies = [
	{value: 'EUR', label: '\u20ac - Euro'},
	{value: 'USD', label: '$ - US Dollar'},
];

class BasicInformationForm extends React.Component {

	render = () => (
		<div className={styles.formContainer}>

			<h1 className={styles.title}>Create</h1>

			<div className={styles.introductionTextContainer}>
				<p>Nobts are used for any occasion where you want to split bills among a group of people. </p>
			</div>

			<div className={styles.form}>

				<div className={styles.formLine}>
					<label>Name your Nobt</label>
					<Input
						hint="Barbecue, London Trip, ..."
						theme={NobtNameInputTheme}
						value={this.props.nobtName}
						onChange={this.props.changeNobtName}
					/>
				</div>

				<div className={styles.formLine}>
					<label>Choose currency</label>
					<Dropdown
						auto
						source={currencies}
						value={this.props.currency}
						theme={NobtCurrencyDropdownTheme}
						onChange={this.props.selectCurrency}
						required
					/>

					<div className={styles.description}>
						<p>This is the default currency for all bills you add to the Nobt. Bills in foreign currencies can be converted to this
							one.</p>
					</div>
				</div>

				<div className={styles.continueButtonContainer}>
					<Link to="/create/members">
						<ContinueButton label="Continue" disabled={!this.props.nobtName} icon="arrow_forward" />
					</Link>
				</div>

			</div>

		</div>
	)
}

export default connect(
	(state) => ({
		nobtName: getNobtName(state),
		currency: getCurrency(state)
	}),
	{
		changeNobtName,
		selectCurrency
	}
)(BasicInformationForm)
