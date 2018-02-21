import * as React from "react";
import { AppBar } from "react-toolbox/lib/app_bar/index";
import BrandedAppBarTheme from "./BrandedAppBarTheme.scss"
import { FontIcon } from "react-toolbox/lib/font_icon/index";
import withNavigation from "../hoc/withNavigation";
import LocationBuilder from "../../routes/App/modules/navigation/LocationBuilder";

const goBack = (replace) => LocationBuilder.fromWindow().pop(1).apply(replace);

const brandenAppBar = ({canGoBack, replace}) => {
  return (<AppBar
      theme={BrandedAppBarTheme}
      title="nobt.io"
      leftIcon={canGoBack === true ? <FontIcon value="chevron_left" /> : null}
      onLeftIconClick={canGoBack === true ? () => goBack(replace) : null}
    />
  )
};

export default withNavigation(brandenAppBar);
