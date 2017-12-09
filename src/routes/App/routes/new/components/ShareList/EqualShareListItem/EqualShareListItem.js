import React from "react";
import Checkbox from "react-toolbox/lib/checkbox";
import ShareListItem from "../ShareListItem";

const EqualShareListItem = (props) => {

  const handleOnCheckboxChanged = (newState) => props.onCheckboxChange(name, newState);

  const {name, amount, value} = props.share;

  return (
    <ShareListItem
      key={props.name}
      name={name}
      amount={amount}
      control={<Checkbox
        checked={value}
        onChange={ handleOnCheckboxChanged }
      />}
      listItemProps={{
        ripple: false
        /*
         TODO:
         It would be nice to make the whole ListItem clickable (which could be indictated through the ripple effect.
         For some obscure reason, the click is registered twice as soon as there is a click-handler on the checkbox AND on the ListItem.
         ATM, this is not so important but could be investigated later ...
         */
      }}
    />
  )
};

export default EqualShareListItem

EqualShareListItem.propTypes = {
  share: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    amount: React.PropTypes.number,
    value: React.PropTypes.bool.isRequired,
  }),
  onCheckboxChange: React.PropTypes.func.isRequired
};
