import connect from 'react-redux/es/connect/connect';
import { replace } from 'react-router-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

class GuardedRoute extends Route {
  render() {
    if (!this.props.condition()) {
      this.props.go(this.props.fallBackPath);
      return null;
    } else {
      return super.render();
    }
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    go: path => dispatch(replace(path)),
  })
)(GuardedRoute);

GuardedRoute.propTypes = {
  condition: PropTypes.func,
  fallbackPath: PropTypes.string,
};
