import React from "react";
import withNavigation from "components/hoc/withNavigation";
import LocationBuilder from "../../modules/navigation/LocationBuilder";
import FAB from "components/FAB/FAB";
import Item from "components/FAB/Item";

const hashFragment = '#chooseMenuAction';

const toggleState = (props) => {
  if (isExpanded(props)) {
    LocationBuilder.fromWindow().pop().apply(props.replace)
  } else {
    LocationBuilder.fromWindow().push(hashFragment).apply(props.push)
  }
};

let isExpanded = props => props.hash === hashFragment;

const NobtFAB = (props) => (
  <FAB expanded={isExpanded(props)} buttonProps={{
    onClick: () => toggleState(props)
  }}>
    <Item
      label="Add a bill"
      buttonProps={{
        icon: "receipt",
        onClick: () => {
          // We need to deactivate the menu before we proceed. Otherwise we end up with an expanded menu if the user navigates back.
          toggleState(props);
          LocationBuilder.fromWindow().push("newBill").apply(props.push);
        }
      }}
    />
    <Item
      disabled
      label="Pay someone"
      buttonProps={{
        icon: 'payment'
      }}
    />
  </FAB>
);

export default withNavigation(NobtFAB)
