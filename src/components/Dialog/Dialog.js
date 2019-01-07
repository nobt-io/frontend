import React from "react";
import { Dialog as RTDialog } from "react-toolbox-legacy/lib/dialog";

export default class Dialog extends React.Component {

  render = () => (
    <RTDialog
      active={true}
      onOverlayClick={this.props.goBack}
      {...this.props}
      theme={this.props.theme}
    />
  )

}
