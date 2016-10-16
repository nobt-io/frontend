import React from "react";

const CurrencyContext = React.createClass({
  getChildContext() {
    return {
      currency: this.props.currency
    }
  },

  render: function () {
    return (
      this.props.children
    );
  }
});

CurrencyContext.propTypes = {
  currency: React.PropTypes.string.isRequired
};

CurrencyContext.childContextTypes = {
  currency: React.PropTypes.string
};

export default CurrencyContext;
