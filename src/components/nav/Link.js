import React from "react";
import { Link as RRLink } from "react-router-dom";
import { getNobtId } from "../../routes/App/modules/currentNobt/selectors";
import { connect } from "react-redux";

const Link = ({id, to = '/', children, ...remaining}) => {

	const href = typeof to === 'function' ? to(id) : to;

	return <RRLink to={href} {...remaining}>{children}</RRLink>;
};

export default connect(
	state => ({ id: getNobtId(state) }),
	{}
)(Link)
