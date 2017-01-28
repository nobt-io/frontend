import React from "react";
import { connect } from "react-redux";
import withNavigation from "../../../../../components/hoc/withNavigation";
import { updateBillFilter } from "../../../modules/viewState/actions";
import Dialog from "components/Dialog";
import { getMembers } from "../../../modules/currentNobt/selectors";
import HOList from "containers/HOList";
import { ListItem, ListDivider } from "react-toolbox/lib/list";
import { Person, AvatarPosition } from "components/Person";
import { AvatarSize } from "components/Avatar";
import { getBillFilter } from "../../../modules/viewState/selectors";
import listItemTheme from "./ListItemTheme.scss";
import DialogTheme from "components/Dialog/DialogTheme.scss";

const FilterBillOverlay = (props) => (

  <Dialog>
    <h3 className={DialogTheme.header}>Filter bills</h3>
    <HOList
      selectable
      items={props.members}
      renderItem={ (name) => (
        <ListItem rightIcon={ name === props.currentFilter ? "check_circle" : "radio_button_unchecked" }
                  theme={listItemTheme}
                  key={name}
                  onClick={ () => {
                    props.updateBillFilter(name)
                    props.goBack()
                  } }>
          <Person avatarSize={AvatarSize.MEDIUM} avatarPosition={AvatarPosition.LEFT} name={name} />
        </ListItem>
      )}>
      <ListDivider />
      <ListItem rightIcon={ "" === props.currentFilter ? "check_circle" : "radio_button_unchecked"  }
                theme={listItemTheme}
                key={"None"}
                onClick={ () => {
                  props.updateBillFilter("")
                  props.goBack()
                } }>
        <p className={listItemTheme.clear}>None</p>
      </ListItem>
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
