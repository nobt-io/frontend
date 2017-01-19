import React from "react";
import { connect } from "react-redux";
import { fetchNobt } from "../../routes/App/routes/Overview/modules/currentNobt/actions";

export default function withNobtLoader(WrappedComponent) {

  class NobtLoader extends React.Component {

    constructor(props) {
      super(props)
      this.fetchNobt(props);
    }

    componentWillReceiveProps(nextProps) {
      this.fetchNobt(nextProps)
    }

    fetchNobt(props) {
      let nobtId = props.params.id;

      this.props.fetchNobt(nobtId);
    }

    render() {
      return <WrappedComponent {...this.props}/>
    }
  }

  return connect(
    (state) => ({}),
    (dispatch, props) => ({
      fetchNobt: (id) => dispatch(fetchNobt(id))
    })
  )(NobtLoader)
}
