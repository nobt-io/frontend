import * as React from "react";
import { ListItem as RTListItem } from "react-toolbox/lib/list";
import styles from "./RadioboxItem.scss"
import Avatar from "components/Avatar";
import { RadioButton } from "react-toolbox/lib/radio";

export default ({key, name, selected, selectAction, autoFocus}) => (
  <RTListItem caption={name}
              key={key}
              theme={styles}
              leftActions={[ <Avatar key={name} name={name} medium /> ]}
              rightActions={[
              //e.stopPropagation() not working with react-toolbox
              <span key={name} onClick={e => e.stopPropagation()}>
                  <RadioButton
                    autoFocus={autoFocus}
                    checked={selected}
                    onChange={() => {
                      selectAction(name, !selected);
                    }}
                  />
              </span>
            ]}
              onClick={() => selectAction(name)}
  />);
