import React from "react";
import withNavigation from "components/hoc/withNavigation";
import LocationBuilder from "../../modules/navigation/LocationBuilder";
import { FABMenu, Item, Items, Label, MenuButton, Overlay } from "../../../../components/FAB";
import { Button } from "react-toolbox-legacy/lib/button"

const hashFragment = '#chooseMenuAction';

// Instead of local state, we use the URL's hash fragment to store the state of the FAB menu. This allows the user to close the menu with the back-button :)
const toggleState = (props) => {
  if (isExpanded(props)) {
    LocationBuilder.fromWindow().pop().apply(props.replace)
  } else {
    LocationBuilder.fromWindow().push(hashFragment).apply(props.push)
  }
};

let isExpanded = props => props.hash === hashFragment;

const NobtFAB = (props) => (
  <FABMenu expanded={isExpanded(props)}>
    <Overlay onClick={() => toggleState(props)} />
    <Items>
      <Item>
        <Label>Add a bill</Label>
        <Button icon="receipt" onClick={() => {
          // We need to deactivate the menu before we proceed. Otherwise we end up with an expanded menu if the user navigates back.
          toggleState(props);
          LocationBuilder.fromWindow().push("bill").apply(props.push);
        }} />
      </Item>
      <Item disabled>
        <Label>Pay someone</Label>
        <Button icon="payment" />
      </Item>
    </Items>
    <MenuButton>
      <Button icon="add" onClick={() => toggleState(props)} />
    </MenuButton>
  </FABMenu>
);

export default withNavigation(NobtFAB)
