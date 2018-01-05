import * as React from "react";
import { ListItem } from "react-toolbox/lib/list";
import styles from "./SelectableItem.scss"
import Avatar from "components/Avatar";
import { IconButton } from "react-toolbox/lib/button/index";

export default ({name, selected, selectAction}) => (
  <ListItem caption={name}
            theme={styles}
            leftActions={[ <Avatar name={name} medium /> ]}
            rightActions={[
              // Use an IconButton instead of an Icon in order to align things nicely.
              <IconButton
                icon={selected ? "check_circle" : "radio_button_unchecked"}
                ripple={false}
              />
            ]}
            caption={name}
            onClick={() => selectAction(name)}
  />);
