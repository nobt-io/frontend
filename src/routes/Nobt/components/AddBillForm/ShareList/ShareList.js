import React from "react";
import ShareListPropTypes from "./ShareListPropTypes";

export const ShareList = (props) => (
  <div>
    {renderShareListItems(props)}
  </div>
);

const renderShareListItems = (props) => {
  return props.shares.map(props.renderShareListItem)
};

export default ShareList

ShareList.propTypes = {
  ...ShareListPropTypes
};
