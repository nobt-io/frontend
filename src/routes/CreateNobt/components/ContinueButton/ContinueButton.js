import * as React from "react";
import Button from "components/Button";
import theme from "./ContinueButtonTheme.scss"

const continueButton = (props) => (<Button raised primary theme={theme} rightIcon {...props}/>)

export default continueButton;
