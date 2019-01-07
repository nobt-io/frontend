import * as React from "react";
import { Button } from "react-toolbox/lib/button/index";
import Theme from "./theme.scss"

export default (props) => (<div>
	<Button theme={Theme} icon={<i className={"fa fa-exchange"}/>} label={"Convert"} raised primary />
</div>);