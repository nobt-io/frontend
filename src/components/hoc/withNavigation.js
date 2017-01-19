import React from "react";
import { connect } from "react-redux";
import { push, goBack, go, goForward, replace } from "react-router-redux";

export default function withNavigation(WrappedComponent) {

  class PropsProxy extends React.Component {

    render() {
      return <WrappedComponent {...this.props}/>
    }
  }

  return connect(
    (state) => ({}),
    (dispatch, props) => ({
      push: (path) => dispatch(push(path)),
      go: (path) => dispatch(go(path)),
      replace: (path) => dispatch(replace(path)),
      goBack: () => dispatch(goBack()),
      goForward: () => dispatch(goForward()),
    })
  )(PropsProxy)
}
