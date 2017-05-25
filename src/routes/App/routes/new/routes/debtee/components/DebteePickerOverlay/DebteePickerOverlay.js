import React from "react";
import HOList from "containers/HOList";
import { ListItem } from "react-toolbox/lib/list";
import { Avatar } from "components/Avatar";
import styles from "./DebteePickerOverlay.scss";
import listItemTheme from "./ListItemTheme.scss";
import DebteeListTheme from "./DebteeListTheme.scss";
import _debug from "debug";
import AddMember from "../../../../components/AddMember/AddMember";
import LocationBuilder from "../../../../../../modules/navigation/LocationBuilder";
import { connect } from "react-redux";
import { getDebtee, getAllMembers } from "../../../../modules/addBillForm/selectors";
import Dialog from "components/Dialog";
import DialogTheme from "components/Dialog/DialogTheme.scss";
import { newDebteeSelected } from "../../../../modules/addBillForm/actions";

const log = _debug("DebteePicker");

class DebteePickerOverlay extends React.Component {

  render = () => {

    return (
      <div className={this.props.className}>

        <Dialog>
          <div className={styles.container}>
            <h3 className={DialogTheme.header}>Who paid?</h3>
            <HOList
              theme={DebteeListTheme}
              selectable
              items={this.props.members}
              renderItem={ (name) => (
                <ListItem
                  theme={listItemTheme}
                  key={name}
                  leftIcon={<Avatar name={name} medium/>}
                  rightIcon={ name === this.props.debtee ? "check_circle" : "radio_button_unchecked" }
                  caption={name}
                  onClick={ () => this.handleOnPersonPicked(name) }>
                </ListItem>
              )}>
            </HOList>
            <AddMember onNewMember={this.handleOnPersonPicked} />
          </div>
        </Dialog>
      </div>
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
