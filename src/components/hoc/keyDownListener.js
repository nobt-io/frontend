import React from "react";

const keyDownListenerHoc = (keyAssertion, propsCreator) => (keyDownHandle) => (WrappedComponent) => {
  return class keyDownWrapper extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {keyIsDown: false};

      this.keyHandler = this.keyHandler.bind(this);
      this.keyHandleDown = this.keyHandleDown.bind(this);
      this.keyHandleUp = this.keyHandleUp.bind(this);
      this.isKeyDown = this.isKeyDown.bind(this);
    }

    keyHandleDown(e) {
      this.keyHandler(e, true)
    }

    keyHandleUp(e) {
      this.keyHandler(e, false)
    }

    keyHandler(e, isDown) {
      const keyIsDown = keyAssertion(e) && isDown;
      this.setState({keyIsDown});

      if (keyIsDown && typeof keyDownHandle === "function") {
        keyDownHandle(this.props);
      }
    }

    isKeyDown() {
      return this.state.keyIsDown;
    }

    componentDidMount() {
      document.addEventListener('keydown', this.keyHandleDown);
      document.addEventListener('keyup', this.keyHandleUp);
    }

    componentWillUnmount() {
      document.removeEventListener('keydown', this.keyHandleDown);
      document.removeEventListener('keyup', this.keyHandleUp);
    }

    render() {
      const additionalProps = typeof propsCreator !== "undefined" ? propsCreator(this.isKeyDown) : {};
      const props = {...this.props, ...additionalProps};

      return <WrappedComponent {...props} />
    }
  };
};

const keyCodes = {enterKey: 13};

export const withCtrlKeyDownLister = keyDownListenerHoc(e => e.ctrlKey, (isKeyDownHandle) => ({isCtrlKeyDown: isKeyDownHandle}));
export const withCtrlAndEnterKeyDownLister = keyDownListenerHoc(e => e.ctrlKey && e.keyCode === keyCodes.enterKey);
