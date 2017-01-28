import React from "react";
import { connect } from "react-redux";
import withNavigation from "components/hoc/withNavigation";
import { ListItem } from "react-toolbox/lib/list";
import { updateBillSortProperty } from "../../../modules/viewState/actions";
import Dialog from "components/Dialog";
import { getBillSortProperty } from "../../../modules/viewState/selectors";
import HOList from "containers/HOList/HOList";
import listItemTheme from "./ListItemTheme.scss";
import DialogTheme from "components/Dialog/DialogTheme.scss";


const SortBillOverlay = (props) => (

  <Dialog>
    <h3 className={DialogTheme.header}>Sort bills</h3>

    <HOList
      selectable
      items={ [
        {name: "Date", icon: "access_time"},
        {name: "Amount", icon: "timeline"}
      ]}
      renderItem={ (config) => (
        <ListItem rightIcon={ config.name === props.currentSort ? "check_circle" : "radio_button_unchecked" }
                  theme={listItemTheme}
                  key={config.name}
                  caption={config.name}
                  leftIcon={config.icon}
                  onClick={ () => {
                    props.updateBillSortProperty(config.name);
                    props.goBack()
                  } }>
        </ListItem>
      )}>
    </HOList>
  </Dialog>
);

export default withNavigation(
  connect(
    (state) => ({
      currentSort: getBillSortProperty(state)
    }),
    (dispatch) => ({
      updateBillSortProperty: (property) => dispatch(updateBillSortProperty(property)),
    })
  )(SortBillOverlay)
)
