import React from "react";
import { connect } from "react-redux";
import withNavigation from "../../../../../components/hoc/withNavigation";
import { updateBillFilter } from "../../../modules/viewState/actions";
import Dialog from "components/Dialog";
import { getMembers } from "../../../modules/currentNobt/selectors";
import HOList from "containers/HOList";
import { ListItem, ListDivider } from "react-toolbox/lib/list";
import { Avatar } from "components/Avatar";
import { getBillFilter } from "../../../modules/viewState/selectors";
import listItemTheme from "./ListItemTheme.scss";
import listTheme from "./ListTheme.scss";
import DialogTheme from "components/Dialog/DialogTheme.scss";

const FilterBillOverlay = (props) => (

  <Dialog>
    <h3 className={DialogTheme.header}>Filter bills</h3>
    <HOList
      theme={listTheme}
      selectable
      items={props.members}
      renderItem={ (name) => (
        <ListItem
          rightIcon={ name === props.currentFilter ? "check_circle" : "radio_button_unchecked" }
          theme={listItemTheme}
          key={name}
          onClick={ () => {
            props.updateBillFilter(name)
            props.goBack()
          } }
          leftIcon={<Avatar name={name} medium />}
          caption={name}
        />
      )}>
      <ListDivider />
      <ListItem
        rightIcon={ "" === props.currentFilter ? "check_circle" : "radio_button_unchecked"  }
        theme={listItemTheme}
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
