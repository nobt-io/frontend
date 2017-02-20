import React from "react";
import { List } from "react-toolbox/lib/list";

export const HOList = (props) => (
  <List {...props}>
    {createActualItems(props)}
  </List>
);

export default HOList

const createActualItems = (props) => {

  var filteredItems = props.items.filter(props.shouldRenderItem).map(props.renderItem);

  if (props.children) {
    filteredItems.push(props.children);
  }

  return filteredItems;
}

HOList.propTypes = {
  items: React.PropTypes.array.isRequired,
  renderItem: React.PropTypes.func.isRequired,
  shouldRenderItem: React.PropTypes.func,
};

HOList.defaultProps = {
  shouldRenderItem: (item) => true
};
