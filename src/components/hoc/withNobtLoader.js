import React from "react";
import { connect } from "react-redux";
import { fetchNobt } from "../../routes/App/Nobt/modules/currentNobt/actions";
import { shouldFetchNobt } from "../../routes/App/Nobt/modules/currentNobt/selectors";
import debug from "debug";

export default function withNobtLoader(WrappedComponent) {

  class NobtLoader extends React.Component {

    constructor(props) {
      super(props);
      NobtLoader.fetchNobtIfNecessary(props);
    }

    componentWillReceiveProps(nextProps) {
      NobtLoader.fetchNobtIfNecessary(nextProps)
    }

    static fetchNobtIfNecessary(props) {
      let nobtId = props.routeParams.nobtId;

      if (props.shouldFetchNobt) {

        debug("NobtLoader")("Fetching nobt.");

        props.fetchNobt(nobtId);
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
