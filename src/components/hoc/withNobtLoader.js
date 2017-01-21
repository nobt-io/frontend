import React from "react";
import { connect } from "react-redux";
import { fetchNobt } from "../../routes/App/Nobt/modules/currentNobt/actions";
import { shouldFetchNobt } from "../../routes/App/Nobt/modules/currentNobt/selectors";
import debug from "debug";

export default function withNobtLoader(WrappedComponent) {

  class NobtLoader extends React.Component {

    constructor(props) {
      super(props);
      this.fetchNobt(props);
    }

    componentWillReceiveProps(nextProps) {
      this.fetchNobt(nextProps)
    }

    fetchNobt(props) {
      let nobtId = props.params.nobtId;

      if (this.props.shouldFetchNobt) {

        debug("NobtLoader")("Fetching nobt.");

        this.props.fetchNobt(nobtId);
      }
    }

    render() {
      return <WrappedComponent {...this.props}/>
    }
  }

  return connect(
    (state) => ({
      shouldFetchNobt: shouldFetchNobt(state)
    }),
    (dispatch, props) => ({
      fetchNobt: (id) => dispatch(fetchNobt(id))
    })
  )(NobtLoader)
}
