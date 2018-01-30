import * as React from "react";
import { ListItem } from "react-toolbox/lib/list";
import styles from "./RadioboxItem.scss"
import Avatar from "components/Avatar";
import { Checkbox } from "react-toolbox/lib/checkbox";

export default ({key, name, selected, selectAction, noAvatar}) => (
  <ListItem caption={name}
            key={key}
            theme={styles}
            leftActions={noAvatar ? [] : [ <Avatar key={name} name={name} medium /> ]}
            rightActions={[
              //e.stopPropagation() not working with react-toolbox
              <span key={name} onClick={e => e.stopPropagation()}>
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

