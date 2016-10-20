import React from "react";


import Header from "components/Header"
import Overlay from "./Overlay"

const LowerScreenOverlay = React.createClass({

  onOverlayRefUpdated: function (overlayRef) {
    this._overlay = overlayRef;
    this.props.onOverlayRefUpdated(overlayRef);
  },

  render: function () {
    return (
      <Overlay ref={this.onOverlayRefUpdated}>
        {this.props.children}
      </Overlay>
    );
  }
});

LowerScreenOverlay.propTypes = {
  onOverlayRefUpdated: React.PropTypes.func
};

LowerScreenOverlay.defaultProps = {
  header: '',
  onOverlayRefUpdated: (overlayRef) => { }
};

export default LowerScreenOverlay;
