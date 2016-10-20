import React from "react";
import styles from "./BillFilter.scss";

import Header from "components/Header"
import FontIcon from "react-toolbox/lib/font_icon";
import {IconButton} from 'react-toolbox/lib/button';

import PersonSelectorOverlay from "components/PersonSelectorOverlay";
import { List, ListItem } from "react-toolbox/lib/list";

import Overlay from "components/Overlay/Overlay"

import {Avatar} from "components/Avatar";

export const BillFilter = React.createClass({

  onFilterModalClose: function () {
    this.setState({sortModalIsActive: false, filterModalIsActive: false});
  },

  onFilterModalOpen: function () {
    this.setState({sortModalIsActive: false, filterModalIsActive: true});
  },

  onSortModalClose: function () {
    this.setState({sortModalIsActive: false, filterModalIsActive: false});
  },

  onSortModalOpen: function () {
    this.setState({sortModalIsActive: true, filterModalIsActive: false});
  },

  render: function () {

    const {filterModalIsActive, sortModalIsActive} = this.state || {filterModalIsActive: false, sortModalIsActive: false};
    const {personNames, onFilterChange, onSortChange, currentFilter, currentSort, onReset} = this.props;

    const defaultFilter = currentSort == "Date" && currentFilter == "";

    const filter = currentFilter == ''
      ? (<b>All</b>)
      : (<span className={styles.personFilter}>
          <b>{currentFilter}</b>
          <Avatar name={currentFilter} size={20} fontSize={11}/>
        </span>);

    return (
      <div className={styles.container}>
        <PersonSelectorOverlay
          title={"Filter bills by"}
          active={filterModalIsActive} onFilterChange={onFilterChange} onClose={this.onFilterModalClose}
          names={personNames} canSelectAll={true}/>

        <Overlay ref={ (overlayRef) => this._sortPropertyPickerOverlay = overlayRef }>
          <div className={styles.sortPropertyListContainer}>
            <Header
              left={<h3>Sort by</h3>}
              right={<IconButton icon="close" onClick={() => this._sortPropertyPickerOverlay.close()} />}
              theme={ {

              } }
            />
            <List selectable ripple>
              <ListItem key="Sort.ByDate" onClick={onSortChange} caption={"Date"} leftIcon="access_time"/>
              <ListItem key="Sort.ByAmount" onClick={onSortChange} caption={"Amount"} leftIcon="timeline"/>
            </List>
          </div>
        </Overlay>

        <div>
          <span onClick={onReset} style={{display: defaultFilter ? "none" : "inline"}}
                className={styles.filterIcon}><FontIcon value='clear'/></span>

          <span onClick={() => this._sortPropertyPickerOverlay.open()} className={styles.filter}>sort by <b>{currentSort}</b></span>
          <span onClick={this.onFilterModalOpen} className={styles.filter}>filter by {filter}</span>
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
