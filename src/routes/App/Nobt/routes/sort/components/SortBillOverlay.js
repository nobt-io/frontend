import React from "react";
import { connect } from "react-redux";
import withNavigation from "../../../../../../components/hoc/withNavigation";
import Header from "components/Header";
import { IconButton } from "react-toolbox/lib/button";
import { List, ListItem } from "react-toolbox/lib/list";
import { updateBillSortProperty } from "../../../modules/viewState/actions";
import { Dialog } from "react-toolbox/lib/dialog";

const SortBillOverlay = (props) => (

  <Dialog active={true} onOverlayClick={props.goBack}>
    <Header
      left={<h3>Sort by</h3>}
      right={<IconButton icon="close" onClick={props.goBack} />}
    />
    <List selectable ripple>
      <ListItem key="Sort.ByDate" onClick={props.updateBillSortProperty} caption={"Date"} leftIcon="access_time" />
      <ListItem key="Sort.ByAmount" onClick={props.updateBillSortProperty} caption={"Amount"} leftIcon="timeline" />
    </List>
  </Dialog>
);

export default withNavigation(
  connect(
    (state) => ({}),
    (dispatch) => ({
      updateBillFilter: (property) => dispatch(updateBillSortProperty(property)),
    })
  )(SortBillOverlay)
)
