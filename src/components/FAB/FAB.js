import * as React from "react";
import styles from "./FAB.scss";
import RTButtonTheme from "./RTButtonTheme.scss";
import classNames from "classnames";
import { Button, ButtonProps } from "react-toolbox/lib/button/index";

const FABMenuBackground = (props, context) =>
  <div className={classNames(styles.background, {
    [styles.active]: context.expanded
  })}
  />;

FABMenuBackground.contextTypes = {
  expanded: React.PropTypes.bool
};

const FABMenu = (props) => <div className={styles.fabMenu}>{props.children}</div>;


export default class FAB extends React.Component {

  state = {
    expanded: false
  };

  getChildContext = () => {
    return {
      expanded: this.state.expanded
    };
  };

  getLegalButtonProps = () => {
    let {
      children,
      ...other
    } = this.props;

    return other;
  };

  toggleState = () => this.setState({expanded: !this.state.expanded});

  render = () => (
    <div className={styles.fabContainer}>

      <FABMenuBackground />

      <FABMenu>
        {this.props.children}
      </FABMenu>

      <Button
        floating
        theme={RTButtonTheme}
        primary
        className={classNames({
          [RTButtonTheme.expanded]: this.state.expanded
        })}
        icon='add'
        onClick={this.toggleState}
        {...this.getLegalButtonProps()}
      />
    </div>
  );

  static childContextTypes = {
    expanded: React.PropTypes.bool
  };
}
