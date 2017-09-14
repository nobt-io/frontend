import React from "react";
import styles from "./AddBillFAB.scss";
import { Button } from "react-toolbox/lib/button";
import withNavigation from "components/hoc/withNavigation";
import classNames from "classNames";
import LocationBuilder from "../../modules/navigation/LocationBuilder";

// TODO: Use a real FAB library here that allows to hide the button on scroll
class AddBillFAB extends React.Component {

  state = {
    expanded: false
  };

  toggleExpanded = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render = () => (
    <Button
      icon='add'
      className={classNames(styles.button, {
        [styles.expanded]: this.state.expanded
      })}
      primary
      floating
      onClick={ this.toggleExpanded }
    />
  )
}

export default withNavigation(AddBillFAB)
