import React from "react";
import AmountTheme from "./AmountTheme.scss";
import { Avatar } from "components/Avatar";
import Amount from "components/Amount";
import { ListItem, ListItemProps } from "react-toolbox/lib/list";

export const ShareListItem = (props) => (
    <ListItem
      ripple={false}
      leftActions={[
        <Avatar name={props.name} medium />
      ]}
      caption={props.name}
      rightActions={[
        props.amount !== null && props.amount !== 0 && <Amount theme={AmountTheme} value={props.amount} />,
        props.control
      ]}
      {...props.listItemProps}
    />)
  ;

export default ShareListItem

ShareListItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number,
  control: React.PropTypes.element.isRequired,
  listItemProps: ListItemProps
};
