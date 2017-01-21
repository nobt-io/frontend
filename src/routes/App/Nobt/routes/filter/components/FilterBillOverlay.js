import React from "react"

import { connect } from "react-redux";
import Visibility from "../../../../../../const/Visibility";
import withNavigation from "../../../../../../components/hoc/withNavigation";
import Header from "components/Header";
import { IconButton } from "react-toolbox/lib/button";
import { List, ListItem } from "react-toolbox/lib/list";
import Overlay from "components/Overlay";
import { updateBillSortProperty } from "../../../modules/viewState/actions";


const SortBillOverlay = (props) => (
  /*
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
  */
  <div>
    <h1>Filter here</h1>
  </div>
);

export default withNavigation(
  connect(
    (state) => ({}),
    (dispatch) => ({
      updateBillSortProperty: (property) => dispatch(updateBillSortProperty(property)),
    })
  )(SortBillOverlay)
)
