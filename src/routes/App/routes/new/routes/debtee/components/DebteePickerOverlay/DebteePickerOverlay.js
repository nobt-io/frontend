import React from "react";
import HOList from "containers/HOList";
import { ListItem } from "react-toolbox/lib/list";
import { Avatar } from "components/Avatar";
import _debug from "debug";
import AddMember from "../../../../components/AddMember/AddMember";
import LocationBuilder from "../../../../../../modules/navigation/LocationBuilder";
import { connect } from "react-redux";
import { getAllMembers, getDebtee } from "../../../../modules/addBillForm/selectors";
import Dialog from "components/Dialog";
import DialogTheme from "components/Dialog/DialogTheme.scss";
import { newDebteeSelected } from "../../../../modules/addBillForm/actions";

const log = _debug("DebteePicker");

class DebteePickerOverlay extends React.Component {

  render = () => {

    return (
      <Dialog>
        <h3 className={DialogTheme.header}>Who paid?</h3>
        <HOList
          selectable
          items={this.props.members}
          renderItem={ (name) => (
            <ListItem
              key={name}
              leftActions={[
                <Avatar name={name} medium/>
              ]}
              rightIcon={ name === this.props.debtee ? "check_circle" : "radio_button_unchecked" }
              caption={name}
              onClick={ () => this.handleOnPersonPicked(name) }>
            </ListItem>
          )}>
        </HOList>
        <AddMember onNewMember={this.handleOnPersonPicked} />
      </Dialog>    )
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
