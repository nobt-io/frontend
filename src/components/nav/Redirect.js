import React from "react";
import { Redirect as RRRedirect } from "react-router-dom";
import { getNobtId } from "../../routes/App/modules/currentNobt/selectors";
import { connect } from "react-redux";

const Redirect = ({id, to = '/', children, ...props}) => {

	const href = typeof to === 'function' ? to(id) : to;

	return <RRRedirect to={href} {...props}>{children}</RRRedirect>;
};

export default connect(
	state => ({ id: getNobtId(state) }),
	{}
)(Redirect)