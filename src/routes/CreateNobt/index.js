import WizardContainer from "./containers/WizardContainer";
import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import withNavigation from "../../components/hoc/withNavigation";
import BasicInformationForm from "./routes/name/components/BasicInformationForm";
import DoneScreen from "./routes/done/components/DoneScreen";
import AddMembersForm from "./routes/members/components/AddMembersForm/AddMembersForm";
import { getCreatedNobtId, getNobtName } from "./modules/selectors";
import GuardedRoute from "../../utils/RouteExtensions/GuardedRoute";

export default (store) => {
  return (<Route
    path={"/create/"}
    render={() => (
      <WizardContainer>
        <Switch>
          <Route exact path={"/create/name"} component={withNavigation(BasicInformationForm)} />
          <GuardedRoute exact path={"/create/members"}
                        condition={() => getNobtName(store.getState())} fallBackPath={"/create/name"}
                        component={withNavigation(AddMembersForm)} />
          <GuardedRoute exact path={"/create/done"}
                        condition={() => getCreatedNobtId(store.getState())} fallBackPath={"/create/name"}
                        component={withNavigation(DoneScreen)} />
          <Redirect from={"/create"} to={"/create/name"} />
        </Switch>
      </WizardContainer>
    )}
  />)
}