import React from "react";

const keyDownListenerHoc = (keyIdentifier, keyAssertion) => (keyDownHandle) => (WrappedComponent) => {
  return class keyDownWrapper extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {keyIsDown: false};

      this.keyHandler = this.keyHandler.bind(this);
      this.isKeyDown = this.isKeyDown.bind(this);
    }

    keyHandler(e) {
      const keyIsDown = keyAssertion(e);
      this.setState({keyIsDown});

      if (keyIsDown && typeof keyDownHandle === "function") {
        keyDownHandle(this.props);
      }
    }

    isKeyDown() {
      return this.state.keyIsDown;
    }

    componentDidMount() {
      document.addEventListener('keydown', this.keyHandler);
      document.addEventListener('keyup', this.keyHandler);
    }

    componentWillUnmount() {
      document.removeEventListener('keydown', this.keyHandler);
      document.removeEventListener('keyup', this.keyHandler);
    }


    render() {
      const props = {...this.props};
      props[ keyDownWrapper.getPropName(keyIdentifier) ] = this.isKeyDown;

      return <WrappedComponent {...props} />
    }

    static getPropName(keyIdentifier) {
      return `is${keyDownWrapper.upperCaseFirstLetter(keyIdentifier)}KeyDown`;
    }

    static upperCaseFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  };
};

const keyDefinitions = {enterKey: 13};

export const withCtrlKeyDownLister = keyDownListenerHoc("ctrl", e => e.ctrlKey);
export const withCtrlAndEnterKeyDownLister = keyDownListenerHoc("ctrlAndEnter", e => e.ctrlKey && e.keyCode === keyDefinitions.enterKey);
