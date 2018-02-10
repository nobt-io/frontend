import React from "react";

export default function withCtrlEnterAction(action, WrappedComponent) {
  return React.createClass({
    showMessage() {
      action(this.props);
    },
    keydownHandler(e) {
      const enterKey = 13;
      if (e.keyCode === enterKey && e.ctrlKey) this.showMessage()
    },
    componentDidMount() {
      document.addEventListener('keydown', this.keydownHandler);
    },
    componentWillUnmount() {
      document.removeEventListener('keydown', this.keydownHandler);
    },
    render() {
      return <WrappedComponent {...this.props}/>
    }
  });
}
