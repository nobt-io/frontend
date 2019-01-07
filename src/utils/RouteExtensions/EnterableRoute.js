import PropTypes from "prop-types";
import { Route } from "react-router-dom";

export default class EnterableRoute extends Route {
	componentWillMount() {
		this.props.onEnter();
		super.componentWillMount();
	}
}

EnterableRoute.propTypes = {
	onEnter: PropTypes.func,
	fallbackPath: PropTypes.string
};