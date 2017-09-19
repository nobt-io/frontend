import * as React from "react";
import styles from "./FAB.scss";
import RTButtonTheme from "./MainButtonTheme.scss";
import classNames from "classnames";
import { Button as RTButton } from "react-toolbox/lib/button/index";

const Background = (props, context) =>
  <div
    className={classNames(styles.background, {
      [styles.active]: context.expanded
    })}
    onClick={() => {
      if (context.expanded) {
        props.onClick()
      }
    }}
  />;

Background.contextTypes = {
  expanded: React.PropTypes.bool
};

const Items = (props) => <div className={styles.items}>{props.children}</div>;

const Button = (props) =>
  <RTButton
    floating
    theme={RTButtonTheme}
    primary
    className={classNames({
      [RTButtonTheme.expanded]: props.expanded
    })}
    icon='add'
    {...props.buttonProps}
  />;

export default class FAB extends React.Component {

  getChildContext = () => {
    return {
      expanded: this.props.expanded
    };
  };

  render = () => (
    <div className={styles.container}>

      <Background onClick={this.props.buttonProps.onClick} />

      <Items>
        {this.props.children}
      </Items>

      <Button expanded={this.props.expanded} buttonProps={this.props.buttonProps} />
    </div>
  );

  static childContextTypes = {
    expanded: React.PropTypes.bool
  };
}
