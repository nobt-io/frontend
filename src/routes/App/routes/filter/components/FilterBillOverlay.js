import React from "react";
import { connect } from "react-redux";
import withNavigation from "../../../../../components/hoc/withNavigation";
import { updateBillFilter } from "../../../modules/viewState/actions";
import Dialog from "components/Dialog";
import { getMembers } from "../../../modules/currentNobt/selectors";
import HOList from "containers/HOList";
import { ListDivider, ListItem } from "react-toolbox/lib/list";
import Avatar from "components/Avatar";
import { getBillFilter } from "../../../modules/viewState/selectors";
import DialogTitle from "components/Dialog/DialogTitle";

const FilterBillOverlay = (props) => (

  <Dialog>
    <DialogTitle>Filter bills</DialogTitle>
    <HOList
      selectable
      items={props.members}
      renderItem={ (name) => (
        <ListItem
          rightIcon={ name === props.currentFilter ? "check_circle" : "radio_button_unchecked" }
          key={name}
          onClick={ () => {
            props.updateBillFilter(name)
            props.goBack()
          } }
          leftActions={[
            <Avatar name={name} medium />
          ]}
          caption={name}
        />
      )}>
      <ListDivider />
      <ListItem
        rightIcon={ "" === props.currentFilter ? "check_circle" : "radio_button_unchecked"  }
        key={"None"}
        caption="None"
        onClick={ () => {
          props.updateBillFilter("")
          props.goBack()
        } } />
    </HOList>
  </Dialog>
);

export default withNavigation(
  connect(
    (state) => ({
      currentFilter: getBillFilter(state),
      members: getMembers(state)
    }),
    (dispatch) => ({
      updateBillFilter: (property) => dispatch(updateBillFilter(property)),
    })
  )(FilterBillOverlay)
)
