import * as React from "react";
import classNames from "classnames";
import styles from "./FABMenuItem.scss"
import { Button } from "react-toolbox/lib/button/index";

const FABItemContainer = (props, context) =>
  <div className={classNames(styles.fabItemContainer, {
    [styles.expanded]: context.expanded
  })}>
    {props.children}
  </div>;


FABItemContainer.contextTypes = {
  expanded: React.PropTypes.bool
};

const FABItemLabel = (props, context) =>
  <span className={classNames(styles.fabItemLabel, {
    [styles.expanded]: context.expanded
  })}>
    {props.label}
  </span>;

FABItemLabel.contextTypes = {
  expanded: React.PropTypes.bool
};

const FABMenuItem = (props, context) =>
  <FABItemContainer>
    <FABItemLabel label={props.label} />
    <Button
      className={classNames(styles.itemButton, {
        [styles.expanded]: context.expanded
      })}
      floating
      primary
      {...props.buttonProps}
    />
  </FABItemContainer>;

FABMenuItem.contextTypes = {
  expanded: React.PropTypes.bool
};

export default FABMenuItem
