import * as React from "react";
import { AppBar } from "react-toolbox/lib/app_bar/index";
import BrandedAppBarTheme from "./BrandedAppBarTheme.scss"
import { FontIcon } from "react-toolbox/lib/font_icon/index";

export default (props) => {

  const canGoBack = props.onBackHandle !== null;

  return (<AppBar
      theme={BrandedAppBarTheme}
      title="nobt.io"
      leftIcon={canGoBack ? <FontIcon value="chevron_left" /> : null}
      onLeftIconClick={canGoBack ? () => props.onBackHandle : null}
    />
  )
}
