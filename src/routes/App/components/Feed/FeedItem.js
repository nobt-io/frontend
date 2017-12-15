import { IconButton } from "react-toolbox/lib/button/index";
import { ListItem } from "react-toolbox/lib/list/index";
import * as React from "react";

const FeedItem = ({icon, caption, legend, onClick}) => (
  <ListItem
    key={caption + legend}
    leftIcon={icon}
    caption={caption}
    legend={legend}
    onClick={onClick && onClick}
    rightActions={[
      onClick && <IconButton icon="chevron_right" />
    ]}
    ripple={false}
  />
);

export default FeedItem;
