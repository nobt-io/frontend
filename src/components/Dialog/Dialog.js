import React from "react";
import DialogTheme from "./DialogTheme.scss";
import { Dialog as RTDialog } from "react-toolbox/lib/dialog";
import merge from "styles/merge";

export default class Dialog extends React.Component {

  render = () => (
    <RTDialog
      active={true}
      onOverlayClick={this.props.goBack}
      {...this.props}
      theme={merge(DialogTheme, this.props.theme)}
    />
  )

}
