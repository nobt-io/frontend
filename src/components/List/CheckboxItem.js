import * as React from "react";
import { ListItem } from "react-toolbox/lib/list";
import styles from "./RadioboxItem.scss"
import Avatar from "components/Avatar";
import { Checkbox } from "react-toolbox/lib/checkbox";

export default ({name, selected, selectAction, noAvatar}) => (
  <ListItem caption={name}
            key={name}
            theme={styles}
            leftActions={noAvatar ? [] : [ <Avatar name={name} medium /> ]}
            rightActions={[
              //e.stopPropagation() not working with react-toolbox
              <span onClick={e => e.stopPropagation()}>
                  <Checkbox
                    checked={selected}
                    onChange={() => {
                      selectAction(name, !selected);
                    }}
                  />
                </span>
            ]}
            onClick={() => {
              selectAction(name, !selected);
            }}
  />);

