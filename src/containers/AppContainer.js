import React, { Component, PropTypes } from "react";
import { Router } from "react-router";
import { Provider } from "react-redux";
import { ThemeProvider } from 'react-css-themr';
import theme from 'styles/custom-component-themes';

class AppContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render() {
    const {history, routes, store} = this.props

    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router history={history} children={routes}/>
        </Provider>
      </ThemeProvider>
    )
  }
}

export default AppContainer
