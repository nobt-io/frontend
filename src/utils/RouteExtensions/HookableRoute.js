import PropTypes from "prop-types";
import { Route } from "react-router-dom";

export default class HookableRoute extends Route {
	componentWillMount() {
		this.props.onEnter();
		super.componentWillMount();
	}
}

HookableRoute.propTypes = {
	onEnter: PropTypes.func,
	fallbackPath: PropTypes.string
};