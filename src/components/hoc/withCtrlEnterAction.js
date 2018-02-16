import React from "react";

export default function withCtrlEnterAction(action, WrappedComponent) {
  return React.createClass({
    callAction() {
      action(this.props);
    },
    keyHandler(e) {
      const enterKey = 13;
      if (e.keyCode === enterKey && e.ctrlKey) {
        this.callAction()
      }
    },
    componentDidMount() {
      document.addEventListener('keydown', this.keyHandler);
    },
    componentWillUnmount() {
      document.removeEventListener('keydown', this.keyHandler);
    },
    render() {
      return <WrappedComponent {...this.props}/>
    }
  });
}
