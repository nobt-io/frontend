import { IconButton } from "react-toolbox-legacy/lib/button/index";
import { ListItem } from "react-toolbox-legacy/lib/list/index";
import FeedItemTheme from "./FeedItemTheme.scss"
import * as React from "react";

export default ({icon, caption, legend, onClick}) => (
  <ListItem
    key={caption + legend}
    leftIcon={icon}
    theme={FeedItemTheme}
    caption={caption}
    legend={legend}
    onClick={onClick && onClick}
    rightActions={[
      onClick && <IconButton icon="chevron_right" />
    ]}
    ripple={false}
  />
);
