import React from "react";
import DialogTheme from "./DialogTheme.scss";
import { Dialog as RTDialog } from "react-toolbox/lib/dialog";
import merge from "styles/merge";

export const Dialog = (props) => (
  <RTDialog
    active={true}
    onOverlayClick={this.props.goBack}
    {...props}
    theme={merge(DialogTheme, props.theme)}
  />
);

export default Dialog
