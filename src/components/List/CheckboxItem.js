import * as React from "react";
import { ListItem as RTListItem } from "react-toolbox/lib/list";
import listItemTheme from "./ListItemTheme.scss"
import Avatar from "components/Avatar";
import { Checkbox } from "react-toolbox/lib/checkbox";

export default ({key, name, selected, selectAction, noAvatar, autoFocus}) => (
  <RTListItem caption={name}
              key={key}
              theme={listItemTheme}
              leftActions={noAvatar ? [] : [ <Avatar key={name} name={name} medium /> ]}
              rightActions={[
              //e.stopPropagation() not working with react-toolbox
              <span key={name} onClick={e => e.stopPropagation()}>
                  <Checkbox
                    autoFocus={autoFocus}
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
