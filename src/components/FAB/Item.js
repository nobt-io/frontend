import * as React from "react";
import classNames from "classnames";
import ItemStyles from "./Item.scss"
import LabelStyles from "./Label.scss"
import ItemButtonTheme from "./ItemButtonTheme.scss"
import { Button as RTButton } from "react-toolbox/lib/button/index";

export default (props, context) =>
  <Item>
    <Label label={props.label} disabled={props.disabled} />
    <Button buttonProps={props.buttonProps} disabled={props.disabled} />
  </Item>;

const Item = (props, context) =>
  <div className={classNames(ItemStyles.item, {
    [ItemStyles.expanded]: context.expanded
  })}>
    {props.children}
  </div>;

Item.contextTypes = {
  expanded: React.PropTypes.bool
};

const Label = (props, context) =>
  <span className={classNames(LabelStyles.label, {
    [LabelStyles.expanded]: context.expanded,
    [LabelStyles.disabled]: props.disabled
  })}>
    {props.label}
  </span>;

Label.contextTypes = {
  expanded: React.PropTypes.bool
};

const Button = (props, context) =>
  <RTButton
    disabled={props.disabled}
    theme={ItemButtonTheme}
    className={classNames({
      [ItemButtonTheme.expanded]: context.expanded
    })}
    floating
    primary
    {...props.buttonProps}
  />;

Button.contextTypes = {
  expanded: React.PropTypes.bool
};
