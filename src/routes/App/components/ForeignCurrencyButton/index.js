import * as React from "react";
import { Button } from "react-toolbox-legacy/lib/button/index";
import ButtonTheme from "./ButtonTheme.scss"
import withNavigation from "../../../../components/hoc/withNavigation";
import LocationBuilder from "../../modules/navigation/LocationBuilder";
import { connect } from "react-redux";
import { getConvertedAmount, isForeignCurrencyBill } from "../../routes/bill/modules/selectors";
import { FontIcon } from "react-toolbox-legacy/lib/font_icon";
import { clearConversionInformation } from "../../routes/bill/modules/actions";
import { getNobtCurrency } from "../../modules/currentNobt/selectors";
import getCurrencySymbol from "currency-symbol-map";
import { ListItem } from "react-toolbox-legacy/lib/list";
import ListItemTheme from "./ListItemTheme.scss"
import List from "../../../../components/List/List";

const goToConversionPage = (push) => () => LocationBuilder.fromWindow().push("convert").apply(push);

const ForeignCurrencyButton = ({push, convertedAmount, clearConversionInformation, nobtCurrency, isForeignCurrencyBill}) => (<div>
	{isForeignCurrencyBill ?
		<List>
			<ListItem
				theme={ListItemTheme}
				leftIcon={[
					<span>{getCurrencySymbol(nobtCurrency)}</span>
				]}
				caption={convertedAmount}
				rightActions={[
					<FontIcon key="clear" value="clear" onClick={() => clearConversionInformation()} />,
					<FontIcon key="edit" value="edit" onClick={goToConversionPage(push)} />
				]} />
		</List> :
		<Button theme={ButtonTheme} icon={<i className={"fa fa-refresh"} />} label={"Change currency"} raised primary onClick={goToConversionPage(push)} />
	}
</div>);

export default withNavigation(connect(
	(state, ownProps) => ({
		nobtCurrency: getNobtCurrency(state),
		convertedAmount: getConvertedAmount(state),
		isForeignCurrencyBill: isForeignCurrencyBill(state)
	}),
	(dispatch) => ({
		clearConversionInformation: () => dispatch(clearConversionInformation())
	})
)(ForeignCurrencyButton))
