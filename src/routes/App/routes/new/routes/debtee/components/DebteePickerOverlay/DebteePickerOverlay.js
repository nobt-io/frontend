import React from "react";
import HOList from "containers/HOList";
import { ListItem } from "react-toolbox/lib/list";
import Avatar from "components/Avatar";
import _debug from "debug";
import AddMember from "components/AddMember";
import LocationBuilder from "../../../../../../modules/navigation/LocationBuilder";
import { connect } from "react-redux";
import { getAllMembers, getDebtee } from "../../../../modules/addBillForm/selectors";
import Dialog from "components/Dialog";
import { newDebteeSelected } from "../../../../modules/addBillForm/actions";
import DialogTitle from "../../../../../../../../components/Dialog/DialogTitle";
import { IconButton } from "react-toolbox/lib/button/index";
import { ListDivider } from "react-toolbox/lib/list/index";

const log = _debug("DebteePicker");

class DebteePickerOverlay extends React.Component {

  render = () => {

    return (
      <Dialog>
        <DialogTitle>Who paid?</DialogTitle>
        <HOList
          selectable
          items={this.props.members}
          renderItem={(name) => (
            <ListItem
              key={name}
              leftActions={[
                <Avatar name={name} medium />
              ]}
              rightActions={[
                // Use an IconButton instead of an Icon in order to align things nicely.
                <IconButton
                  icon={name === this.props.debtee ? "check_circle" : "radio_button_unchecked"}
                  ripple={false}
                />
              ]}
              caption={name}
              onClick={() => this.handleOnPersonPicked(name)}>
            </ListItem>
          )}>
          <ListDivider />
          <AddMember onNewMember={this.handleOnPersonPicked} />
        </HOList>
      </Dialog>
    )
  };

  handleOnPersonPicked = (person) => {
    let path = LocationBuilder.fromWindow().pop().path;

    this.props.onPersonPicked(person)
    this.props.replace(path);
  };
}

export default connect(
  (state) => ({
    members: getAllMembers(state),
    debtee: getDebtee(state)
  }),
  (dispatch) => ({
    onPersonPicked: (debtee) => dispatch(newDebteeSelected(debtee)),
  })
)(DebteePickerOverlay)
