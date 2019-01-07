import * as React from "react";
import { Button } from "react-toolbox/lib/button/index";
import Theme from "./theme.scss"
import withNavigation from "../../../../components/hoc/withNavigation";
import LocationBuilder from "../../modules/navigation/LocationBuilder";

const ForeignCurrencyButton = ({push}) => (<div>
	<Button theme={Theme} icon={<i className={"fa fa-exchange"}/>} label={"Convert"} raised primary onClick={() => {
		LocationBuilder.fromWindow().push("convert").apply(push)
	}} />
</div>);

export default withNavigation(ForeignCurrencyButton)
