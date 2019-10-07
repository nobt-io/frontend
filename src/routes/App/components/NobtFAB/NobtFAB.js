import React, { useState } from 'react';
import {
  FABMenu,
  Item,
  Items,
  Label,
  MenuButton,
  Overlay,
} from '../../../../components/FAB';
import { Button } from 'react-toolbox-legacy/lib/button';
import { useHistory } from 'react-router-dom';
import usePaths from '../../../../hooks/usePaths';

const NobtFAB = () => {
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded(!expanded);

  const history = useHistory();
  const paths = usePaths();

  return (
    <FABMenu expanded={expanded}>
      <Overlay onClick={() => toggle()} />
      <Items>
        <Item>
          <Label>Add a bill</Label>
          <Button
            data-cy={'add-bill-button'}
            icon="receipt"
            onClick={() => {
              // We need to deactivate the menu before we proceed. Otherwise we end up with an expanded menu if the user navigates back.
              setExpanded(false);
              history.push(paths.newBill());
            }}
          />
        </Item>
        <Item disabled>
          <Label>Pay someone</Label>
          <Button icon="payment" data-cy={'add-payment-button'} />
        </Item>
      </Items>
      <MenuButton>
        <Button
          icon="add"
          data-cy={'toggle-menu-button'}
          onClick={() => toggle()}
        />
      </MenuButton>
    </FABMenu>
  );
};

export default NobtFAB;
