import React from "react";
import styles from "./BillFilter.scss";

import Header from "components/Header"
import FontIcon from "react-toolbox/lib/font_icon";
import { IconButton } from 'react-toolbox/lib/button';

import CloseButton from "components/CloseButton"
import PersonPicker from "components/PersonPicker"

import { List, ListItem } from "react-toolbox/lib/list";

import Overlay from "components/Overlay/Overlay"
import { Avatar } from "components/Avatar";

import Visibility from "const/Visibility"

export const BillFilter = React.createClass({

  getInitialState() {
    return {
      sortPropertyPickerOverlayVisibility: Visibility.HIDDEN,
      personFilterOverlayVisibility: Visibility.HIDDEN,
    }
  },

  closePersonFilterOverlay() {
    this.setState({ personFilterOverlayVisibility: Visibility.HIDDEN })
  },

  openPersonFilterOverlay() {
    this.setState({ personFilterOverlayVisibility: Visibility.VISIBLE })
  },

  closeSortPropertyPickerOverlay() {
    this.setState({ sortPropertyPickerOverlayVisibility: Visibility.HIDDEN })
  },

  openSortPropertyPickerOverlay() {
    this.setState({ sortPropertyPickerOverlayVisibility: Visibility.VISIBLE })
  },

  render: function () {

    const {personNames, onFilterChange, onSortChange, currentFilter, currentSort, onReset} = this.props;

    const defaultFilter = currentSort == "Date" && currentFilter == "";

    const filter = currentFilter == ''
      ? (<b>All</b>)
      : (<span className={styles.personFilter}>
          <b>{currentFilter}</b>
          <Avatar name={currentFilter} size={20} fontSize={11} />
        </span>);

    return (
      <div className={styles.container}>

        <Overlay visibility={this.state.personFilterOverlayVisibility} onClickOutside={this.closePersonFilterOverlay}>
          <Header
            left={<h3>Filter bills by</h3>}
            right={<CloseButton onClick={this.closePersonFilterOverlay}/>}
          />
          <PersonPicker names={personNames} onPersonPicked={ (name) => {
            // this.setMetaData({name});
            this.closePersonFilterOverlay()
          }}/>
        </Overlay>

        <Overlay visibility={this.state.sortPropertyPickerOverlayVisibility} onClickOutside={this.closeSortPropertyPickerOverlay}>
          <Header
            left={<h3>Sort by</h3>}
            right={<IconButton icon="close" onClick={this.closeSortPropertyPickerOverlay} />}
          />
          <List selectable ripple>
            <ListItem key="Sort.ByDate" onClick={onSortChange} caption={"Date"} leftIcon="access_time" />
            <ListItem key="Sort.ByAmount" onClick={onSortChange} caption={"Amount"} leftIcon="timeline" />
          </List>
        </Overlay>

        <div>
          <span onClick={onReset} style={{display: defaultFilter ? "none" : "inline"}}
                className={styles.filterIcon}><FontIcon value='clear' /></span>

          <span onClick={this.openSortPropertyPickerOverlay} className={styles.filter}>sort by <b>{currentSort}</b></span>
          <span onClick={this.openPersonFilterOverlay} className={styles.filter}>filter by {filter}</span>
        </div>

      </div>);
  },
});

BillFilter.propTypes = {
  personNames: React.PropTypes.array.isRequired,
  currentFilter: React.PropTypes.string.isRequired,
  currentSort: React.PropTypes.string.isRequired,
  onFilterChange: React.PropTypes.func.isRequired,
  onSortChange: React.PropTypes.func.isRequired,
  onReset: React.PropTypes.func.isRequired,
};

export default BillFilter
