import React from "react";

export const ShareListItemPropTypes = React.PropTypes.shape({
  name: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number,
  value: React.PropTypes.number.isRequired,
});

export default {
  shares: React.PropTypes.arrayOf(ShareListItemPropTypes).isRequired,
  renderShareListItem: React.PropTypes.func.isRequired
};
