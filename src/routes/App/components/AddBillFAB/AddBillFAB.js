import React from "react";
import styles from "./AddBillFAB.scss";
import { Button, IconButton } from "react-toolbox/lib/button";
import withNavigation from "components/hoc/withNavigation";
import classNames from "classnames";
import LocationBuilder from "../../modules/navigation/LocationBuilder";

// TODO: Use a real FAB library here that allows to hide the button on scroll
class AddBillFAB extends React.Component {

  state = {
    expanded: true
  };

  toggleExpanded = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render = () => (
    <div className={styles.fab}>

      <div className={classNames(styles.background, {
        [styles.active]: this.state.expanded
      })}/>

      <div className={classNames(styles.fabItems, {
        [styles.expanded]: this.state.expanded
      })}>
        <div className={classNames(styles.fabItem, {
          [styles.expanded]: this.state.expanded
        })}>
          <span className={styles.fabItemLabel}>
            Add a bill
          </span>
          <Button
            icon='receipt'
            primary
            floating
          />
        </div>
        <div className={classNames(styles.fabItem, {
          [styles.expanded]: this.state.expanded
        })}>
          <div className={styles.fabItemLabel}>
            Pay someone
          </div>
          <Button
            icon='payment'
            primary
            floating
          />
        </div>
      </div>

      <Button
        icon='add'
        className={classNames(styles.button, {
          [styles.expanded]: this.state.expanded
        })}
        primary
        floating
        onClick={ this.toggleExpanded }
      />
    </div>
  )
}

export default withNavigation(AddBillFAB)
