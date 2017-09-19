import * as React from "react";
import styles from "./FAB.scss";
import RTButtonTheme from "./RTButtonTheme.scss";
import classNames from "classnames";
import { Button } from "react-toolbox/lib/button/index";

const FABMenuBackground = (props, context) =>
  <div
    className={classNames(styles.background, {
      [styles.active]: context.expanded
    })}
    onClick={() => {
      if (context.expanded) {
        props.onFabClick()
      }
    }}
  />;

FABMenuBackground.contextTypes = {
  expanded: React.PropTypes.bool
};

const FABMenu = (props) => <div className={styles.fabMenu}>{props.children}</div>;

export default class FAB extends React.Component {

  getChildContext = () => {
    return {
      expanded: this.props.expanded
    };
  };

  getLegalButtonProps = () => {
    let {
      children,
      ...legalProps
    } = this.props;

    return legalProps;
  };

  render = () => (
    <div className={styles.fabContainer}>

      <FABMenuBackground onFabClick={this.props.onFabClick} />

      <FABMenu>
        {this.props.children}
      </FABMenu>

      <Button
        floating
        theme={RTButtonTheme}
        primary
        className={classNames({
          [RTButtonTheme.expanded]: this.props.expanded
        })}
        icon='add'
        onClick={this.props.onFabClick}
        {...this.getLegalButtonProps()}
      />
    </div>
  );

  static childContextTypes = {
    expanded: React.PropTypes.bool
  };
}
