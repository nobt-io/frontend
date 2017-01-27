import React from "react";
import { connect } from "react-redux";
import withNavigation from "../../../../../components/hoc/withNavigation";
import { updateBillFilter } from "../../../modules/viewState/actions";
import { Dialog } from "react-toolbox/lib/dialog";
import Header from "../../../../../components/Header/Header";
import CloseButton from "components/CloseButton";
import { getMembers } from "../../../modules/currentNobt/selectors";
import HOList from "containers/HOList";
import { ListItem, ListDivider } from "react-toolbox/lib/list";
import { Person, AvatarPosition } from "components/Person";
import { AvatarSize } from "components/Avatar";
import { getBillFilter } from "../../../modules/viewState/selectors";
import listItemTheme from "./ListItemTheme.scss";

const FilterBillOverlay = (props) => (

  <Dialog active={true} onOverlayClick={props.goBack}>
    <Header
      left={<h3>Filter bills by</h3>}
      right={<CloseButton onClick={props.goBack} />}
    />
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
