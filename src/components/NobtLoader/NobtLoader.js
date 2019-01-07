import React from "react";
import { connect } from "react-redux";
import { fetchNobt } from "../../routes/App/modules/currentNobt/actions";
import {
	getFetchNobtStatus,
	shouldFetchNobt
} from "../../routes/App/modules/currentNobt/selectors";
import styles from "./NobtLoader.scss";
import debug from "debug";
import AsyncActionStatus from "../../const/AsyncActionStatus";
import { Snackbar } from "react-toolbox-legacy/lib/snackbar/index";
import { ProgressBar } from "react-toolbox-legacy/lib/progress_bar/index";
import UnknownNobt from "./UnknownNobt";
import { withRouter } from "react-router-dom";

class NobtLoader extends React.Component {
	constructor(props) {
		super(props);
		NobtLoader.fetchNobtIfNecessary(props);
	}

	componentWillReceiveProps(nextProps) {
		NobtLoader.fetchNobtIfNecessary(nextProps);
	}

	static fetchNobtIfNecessary(props) {
		let nobtId = props.match.params.nobtId;

		if (props.shouldFetchNobt) {
			debug("NobtLoader")("Fetching nobt.");

			props.fetchNobt(nobtId);
		}
	}

	render() {
		return (
			<div>
				{this.props.fetchStatus === AsyncActionStatus.SUCCESSFUL && this.props.children}

				{this.props.fetchStatus === AsyncActionStatus.IN_PROGRESS && (
					<div className={styles.loader}>
						<div className={styles.separator} />
						<div className={styles.progressBar}>
							<ProgressBar type="circular" mode="indeterminate" multicolor />
						</div>
					</div>
				)}

				{this.props.fetchStatus === AsyncActionStatus.FAILED && (
					<UnknownNobt />
				)}

				<Snackbar
					action="Retry?"
					active={this.props.fetchStatus === AsyncActionStatus.FAILED}
					label="Failed to fetch nobt."
					type="warning"
					onClick={this.props.invalidateNobtData}
				/>
			</div>
		);
	}
}

export default withRouter(connect(
	state => ({
		shouldFetchNobt: shouldFetchNobt(state),
		fetchStatus: getFetchNobtStatus(state)
	}),
	(dispatch, props) => ({
		fetchNobt: id => dispatch(fetchNobt(id))
	})
)(NobtLoader));
