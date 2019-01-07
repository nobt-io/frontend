import React from "react";
import BasicInformationForm from "./components/BasicInformationForm";
import withNavigation from "../../../../components/hoc/withNavigation";
import { Route } from "react-router-dom";

export default (basePath) => (
	<Route exact path={basePath + "name"} component={withNavigation(BasicInformationForm)} />
)
