import React from "react";
import AmountTheme from "./AmountTheme.scss";
import { Avatar } from "components/Avatar";
import Amount from "components/Amount";
import { ListItem } from "react-toolbox/lib/list";
import ShareListItemTheme from "./ShareListItemTheme.scss";

export const ShareListItem = (props) => (
    <ListItem
      ripple={false}
      theme={ShareListItemTheme}
      leftIcon={<Avatar name={props.name} medium />}
      itemContent={
        <div className={ShareListItemTheme.content}>
          <span className={ShareListItemTheme.personName}>{props.name}</span>
          {props.amount !== null && props.amount !== 0 && <Amount theme={AmountTheme} value={props.amount} />}
        </div>
      }
      rightActions={[ props.control ]}
    />)
  ;

export default ShareListItem

ShareListItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number,
  control: React.PropTypes.element.isRequired,
  controlClass: React.PropTypes.string,
};
