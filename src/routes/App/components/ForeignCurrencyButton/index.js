import * as React from "react";
import { Button } from "react-toolbox/lib/button/index";
import Theme from "./theme.scss"
import withNavigation from "../../../../components/hoc/withNavigation";
import LocationBuilder from "../../modules/navigation/LocationBuilder";
import { connect } from "react-redux";
import { getConvertedAmount, getForeignCurrency } from "../../routes/bill/modules/selectors";
import { List, SelectorItem } from "../../../../components/List";
import { FontIcon } from "react-toolbox/lib/font_icon";
import Amount from "../../../../components/Amount/Amount";
import { clearConversionInformation } from "../../routes/bill/modules/actions";

const goToConversionPage = (push) => () => LocationBuilder.fromWindow().push("convert").apply(push);

const ForeignCurrencyButton = ({push, convertedAmount, clearConversionInformation}) => (<div>
	{!convertedAmount ?
		<Button theme={Theme} icon={<i className={"fa fa-exchange"} />} label={"Convert"} raised primary onClick={goToConversionPage(push)} /> :
		<List>
			<SelectorItem
				value={<Amount value={convertedAmount} />}
				rightActions={[
					<FontIcon key="clear" value="clear" onClick={() => clearConversionInformation()}/>,
					<FontIcon key="edit" value="edit" onClick={goToConversionPage(push)}/>
				]} />
		</List>}
</div>);

export default withNavigation(connect(
	(state, ownProps) => ({
		convertedAmount: getConvertedAmount(state),
	}),
	(dispatch) => ({
		clearConversionInformation: () => dispatch(clearConversionInformation())
	})
)(ForeignCurrencyButton))
