import React from "react";
import withNavigation from "components/hoc/withNavigation";
import LocationBuilder from "../../modules/navigation/LocationBuilder";
import FAB from "components/FAB/FAB";
import FABMenuItem from "components/FAB/FABMenuItem";

const hashFragment = '#chooseMenuAction';

const toggleState = (props) => {
  if (isExpanded(props)) {
    LocationBuilder.fromWindow().pop().apply(props.replace)
  } else {
    LocationBuilder.fromWindow().push(hashFragment).apply(props.push)
  }
};

let isExpanded = props => props.hash === hashFragment;

const AddBillFAB = (props) => (
  <FAB expanded={isExpanded(props)} onFabClick={() => toggleState(props)}>
    <FABMenuItem
      label="Add a bill"
      buttonProps={{
        icon: "receipt",
        onClick: () => LocationBuilder.fromWindow().push("newBill").apply(props.push)
      }}
    />
    <FABMenuItem
      disabled
      label="Pay someone"
      buttonProps={{
        icon: 'payment'
      }}
    />
  </FAB>
);

export default withNavigation(AddBillFAB)
