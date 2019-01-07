import React, { Component } from "react";
import { Caption, Heading, SubHeading } from "components/text/index";
import { Main } from "components/Container/index";
import { connect } from "react-redux";
import { getAmount, getForeignCurrency, getRate } from "../modules/selectors";
import LocationBuilder from "../../../modules/navigation/LocationBuilder";
import withNavigation from "components/hoc/withNavigation";
import BrandedAppBar from "components/BrandedAppBar/BrandedAppBar";
import { Section, SectionGroup } from "components/Section/index";
import Button from "components/Button/index";
import { CurrencyInput } from "../../../../../components/Input";
import Input from "../../../../../components/Input/Input";
import CurrencySelect from "../../../../../components/CurrencySelect/CurrencySelect";
import { getNobtCurrency } from "../../../modules/currentNobt/selectors";
import getCurrencySymbol from "currency-symbol-map";
import { saveConversionInformation } from "../modules/actions";
import convertAmount from "../modules/convertAmount";


const goBack = (replace) => LocationBuilder.fromWindow().pop().apply(replace);

class AmountConversionPage extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			amount: props.amount,
			foreignCurrency: props.foreignCurrency,
			rate: props.rate
		};
	}

	state = {
		amount: "",
		foreignCurrency: null,
		rate: "",
		saveAttempted: false
	};

	getForeignCurrencyValue = () => {
		const foreignCurrency = this.state.foreignCurrency;

		if (foreignCurrency) {
			return foreignCurrency.value;
		}

		return null;
	};

	hasForeignCurrency = () => {
		return this.state.foreignCurrency != null;
	};

	hasRate = () => {
		const rate = this.state.rate;

		console.log({rate});

		return rate !== null && rate !== "";
	};

	hasAmount = () => {
		return this.state.amount !== 0;
	};

	getRate = () => {
		if (this.hasRate()) {
			return this.state.rate;
		}

		return "";
	};

	getRateError = () => {
		return this.state.saveAttempted && !this.hasRate() && "This field is mandatory."
	};

	getAmountError = () => {
		return this.state.saveAttempted && !this.hasAmount() && "This field is mandatory."
	};

	getRateCaption = () => {
		return `Conversion rate${this.hasForeignCurrency() ? ` for 1 ${this.props.nobtCurrency} to ${this.getForeignCurrencyValue()}` : ''}:`;
	};

	render = () => {
		let {nobtCurrency, replace, saveConversionInformation} = this.props;

		return (
			<div>
				<BrandedAppBar canGoBack={true} />
				<Main>
					<Heading>Convert amount</Heading>
					<SubHeading>Convert to {nobtCurrency} from a foreign currency:</SubHeading>
					<SectionGroup>
						<Section>
							<Caption>Select foreign currency</Caption>
							<CurrencySelect selectedCurrency={this.state.foreignCurrency}
											unavailableCurrencies={[nobtCurrency]}
											onCurrencyChanged={(newValue) => this.setState({foreignCurrency: newValue})} />
							<Caption>{this.getRateCaption()}</Caption>
							<Input value={this.getRate()}
								   type={"number"}
								   onChange={(newValue) => this.setState({rate: parseFloat(newValue)})}
								   error={this.getRateError()}
							/>
						</Section>
						<Section>
							<Caption>Amount in foreign currency:</Caption>
							<CurrencyInput placeholder="13.37" value={this.state.amount}
										   onChange={((newValue) => this.setState({amount: parseFloat(newValue)}))}
										   currency={this.getForeignCurrencyValue() || nobtCurrency}
										   error={this.getAmountError()}
							/>
						</Section>
						<Section>
							<Caption>Converted amount:</Caption>
							<Input icon={<span>{getCurrencySymbol(nobtCurrency)}</span>}
								   disabled value={convertAmount(this.state.amount, this.state.rate)} />
						</Section>
					</SectionGroup>
					<div style={{
						display: "flex",
						justifyContent: "space-between"
					}}>
						<Button raised primary onClick={() => {

							this.setState({
								saveAttempted: true
							});

							if (this.hasRate() && this.hasForeignCurrency() && this.hasAmount()) {
								saveConversionInformation({
									amount: this.state.amount,
									foreignCurrency: this.state.foreignCurrency,
									rate: this.state.rate
								});
								goBack(replace);
							}
						}} label="Accept" />
						<Button raised onClick={() => goBack(replace)} label="Cancel" />
					</div>
				</Main>
			</div>
		);
	}
}

export default withNavigation(connect(
	(state) => ({
		amount: getAmount(state),
		foreignCurrency: getForeignCurrency(state),
		rate: getRate(state),
		nobtCurrency: getNobtCurrency(state)
	}),
	(dispatch) => ({
		saveConversionInformation: (payload) => dispatch(saveConversionInformation(payload))
	})
)(AmountConversionPage))
