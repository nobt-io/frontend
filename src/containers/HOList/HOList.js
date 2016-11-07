import React from 'react'
import {List} from "react-toolbox/lib/list"
export const HOList = (props) => (
  <List {...props}>
    {props.items.filter(props.shouldRenderItem).map(props.renderItem)}
  </List>
);

export default HOList

HOList.propTypes = {
  items: React.PropTypes.array.isRequired,
  renderItem: React.PropTypes.func.isRequired,
  shouldRenderItem: React.PropTypes.func,
};

HOList.defaultProps = {
  shouldRenderItem: (item) => true
};
