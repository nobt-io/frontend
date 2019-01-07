import React from "react";
import { Caption, Heading, SubHeading } from "components/text/index";
import { Main } from "components/Container/index";
import { connect } from "react-redux";
import { getAmount, getConversionRate, getConvertedAmount, getForeignCurrency } from "../modules/selectors";
import { amountChanged, newDebteeSelected, onConversionRateChanged, onForeignCurrencyChanged } from "../modules/actions";
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

const goBack = (replace) => LocationBuilder.fromWindow().pop().apply(replace);

const AmountConversionPage = ({amount, onAmountChanged, nobtCurrency, convertedAmount, foreignCurrency, conversionRate, onForeignCurrencyChanged, onConversionRateChanged, replace}) => {
	return (
		<div>
			<BrandedAppBar canGoBack={true} />
			<Main>
				<Heading>Convert amount</Heading>
				<SubHeading>Convert to {nobtCurrency} from a foreign currency:</SubHeading>
				<SectionGroup>
					<Section>
						<Caption>Select the foreign currency</Caption>
						<CurrencySelect selectedCurreny={foreignCurrency} onCurrencyChanged={onForeignCurrencyChanged} />
						<Caption>Conversion rate for 1 {nobtCurrency} to {foreignCurrency.value}:</Caption>
						<Input value={conversionRate} type={"number"} onChange={onConversionRateChanged} />
					</Section>
					<Section>
						<Caption>Amount in foreign currency:</Caption>
						<CurrencyInput placeholder="13.37" value={amount} onChange={onAmountChanged}
									   currency={(foreignCurrency || {}).value || nobtCurrency} />
					</Section>
					<Section>
						<Caption>Converted amount:</Caption>
						<Input icon={<span>{getCurrencySymbol(nobtCurrency)}</span>}
							   disabled value={convertedAmount} />
					</Section>
				</SectionGroup>
				<Button raised primary onClick={() => goBack(replace)} label="Accept" />
			</Main>
		</div>
	);
};

export default withNavigation(connect(
	(state) => ({
		amount: getAmount(state),
		foreignCurrency: getForeignCurrency(state),
		conversionRate: getConversionRate(state),
		convertedAmount: getConvertedAmount(state),
		nobtCurrency: getNobtCurrency(state)
	}),
	(dispatch) => ({
		onAmountChanged: (amount) => dispatch(amountChanged(amount)),
		onForeignCurrencyChanged: (foreignCurrency) => dispatch(onForeignCurrencyChanged(foreignCurrency)),
		onConversionRateChanged: (debtee) => dispatch(onConversionRateChanged(debtee)),
	})
)(AmountConversionPage))
