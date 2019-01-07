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

const goBack = (replace) => LocationBuilder.fromWindow().pop().apply(replace);

const AmountConversionPage = ({amount, onAmountChanged, convertedAmount, foreignCurrency, conversionRate, onForeignCurrencyChanged, onConversionRateChanged, replace}) => {
	return (
		<div>
			<BrandedAppBar canGoBack={true} />
			<Main>
				<Heading>Convert amount</Heading>
				<SubHeading>Convert to EUR from a foreign currency.</SubHeading>
				<SectionGroup>
					<Section>
						<Caption>Enter amount in foreign currency.</Caption>
						<CurrencyInput placeholder="13.37" value={amount} onChange={onAmountChanged} />
					</Section>
					<Section>
						<Caption>Which currency is that?</Caption>
						<CurrencySelect selectedCurreny={foreignCurrency} onCurrencyChanged={onForeignCurrencyChanged}/>
						<Caption>What is the conversion rate to EUR?</Caption>
						<Input value={conversionRate} type={"number"} onChange={onConversionRateChanged}/>
					</Section>
					<Section>
						<Caption>Here is your amount in EUR</Caption>
						<Input disabled value={convertedAmount} />
					</Section>
				</SectionGroup>
				<Button raised primary onClick={() => goBack(replace)} label="Accept" />
				<Button raised onClick={() => goBack(replace)} label="Cancel" />
			</Main>
		</div>
	);
};

export default withNavigation(connect(
	(state) => ({
		amount: getAmount(state),
		foreignCurrency: getForeignCurrency(state),
		conversionRate: getConversionRate(state),
		convertedAmount: getConvertedAmount(state)
	}),
	(dispatch) => ({
		onAmountChanged: (amount) => dispatch(amountChanged(amount)),
		onForeignCurrencyChanged: (foreignCurrency) => dispatch(onForeignCurrencyChanged(foreignCurrency)),
		onConversionRateChanged: (debtee) => dispatch(onConversionRateChanged(debtee)),
	})
)(AmountConversionPage))
