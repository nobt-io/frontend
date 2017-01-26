import * as React from "react";
import styles from "./WizardContainer.scss"

export default class WizardContainer extends React.Component {

  render = () => (
    <div className={styles.wizardContainer}>
      {this.props.children}
    </div>
  )}
