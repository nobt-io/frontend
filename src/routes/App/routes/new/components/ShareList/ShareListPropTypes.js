import React from "react";

export default {
  shares: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  renderShareListItem: React.PropTypes.func.isRequired
};
