import React from "react";

export default function withCtrlCheckAction(WrappedComponent) {
  return React.createClass({
    getInitialState() {
      return {ctrlKey: false};
    },
    keyHandler(e) {
      this.setState({ctrlKey: e.ctrlKey});
    },
    isCtrlClicked() {
      return this.state.ctrlKey;
    },
    componentDidMount() {
      document.addEventListener('keydown', this.keyHandler);
      document.addEventListener('keyup', this.keyHandler);
    },
    componentWillUnmount() {
      document.removeEventListener('keydown', this.keyHandler);
      document.removeEventListener('keyup', this.keyHandler);

    },
    render() {
      return <WrappedComponent {...{...this.props, isCtrlClicked: this.isCtrlClicked}} />
    }
  });
}
