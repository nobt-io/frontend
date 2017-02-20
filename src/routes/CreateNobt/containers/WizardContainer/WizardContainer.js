import * as React from "react";
import styles from "./WizardContainer.scss";
import Logo from "components/Logo";

export default class WizardContainer extends React.Component {

  render = () => (
    <div className={styles.wizardContainer}>
      <Logo />
      {this.props.children}
    </div>
  )}
