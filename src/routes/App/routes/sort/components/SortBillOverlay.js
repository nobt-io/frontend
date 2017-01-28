import React from "react";
import { connect } from "react-redux";
import withNavigation from "components/hoc/withNavigation";
import Header from "components/Header";
import { IconButton } from "react-toolbox/lib/button";
import { ListItem } from "react-toolbox/lib/list";
import { updateBillSortProperty } from "../../../modules/viewState/actions";
import Dialog from "components/Dialog";
import { getBillSortProperty } from "../../../modules/viewState/selectors";
import HOList from "containers/HOList/HOList";
import listItemTheme from "./ListItemTheme.scss";


const SortBillOverlay = (props) => (

  <Dialog>
    <Header
      left={<h3>Sort by</h3>}
      right={<IconButton icon="close" onClick={props.goBack} />}
    />

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
