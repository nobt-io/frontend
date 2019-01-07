import React from 'react';
import { connect } from 'react-redux';
import { go, goBack, goForward, push, replace } from 'react-router-redux';

// TODO there should be a component that allows functions like "pushPath" and "popPath" that encapsulates the call to LocationBuilder
export default function withNavigation(WrappedComponent) {
  class PropsProxy extends React.Component {
    static displayName = 'Navigable';

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return connect(
    () => ({}),
    dispatch => ({
      push: path => dispatch(push(path)),
      go: path => dispatch(go(path)),
      replace: path => dispatch(replace(path)),
      goBack: () => dispatch(goBack()),
      goForward: () => dispatch(goForward()),
    })
  )(PropsProxy);
}
