import React from "react";
import HOList from "containers/HOList";
import { ListItem } from "react-toolbox/lib/list";
import Overlay from "components/Overlay";
import { Person, AvatarPosition } from "components/Person";
import { AvatarSize } from "components/Avatar";
import styles from "./DebteePickerOverlay.scss";
import listItemTheme from "./ListItemTheme.scss";
import _debug from "debug";
import AddMember from "../../../../components/AddMember/AddMember";
import LocationBuilder from "../../../../../../modules/navigation/LocationBuilder";
import { connect } from "react-redux";
import { getDebtee, getAllMembers } from "../../../../modules/addBillForm/selectors";

const log = _debug("DebteePicker");

class DebteePickerOverlay extends React.Component {

  render = () => {

    return (
      <div className={this.props.className}>

        <Overlay onClickOutside={this.props.goBack} className={styles.overlay}>
          <div className={styles.container}>
            <h3>Who paid?</h3>
            <HOList
              className={styles.list}
              selectable
              items={this.props.members}
              renderItem={ (name) => (
                <ListItem rightIcon={ name === this.props.debtee ? "check_circle" : "radio_button_unchecked" }
                          theme={listItemTheme}
                          key={name}
                          onClick={ () => this.handleOnPersonPicked(name) }>
                  <Person avatarSize={AvatarSize.MEDIUM} avatarPosition={AvatarPosition.LEFT} name={name} />
                </ListItem>
              )}>
            </HOList>
            <AddMember onNewMember={this.handleOnPersonPicked}/>
          </div>
        </Overlay>
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
    onPersonPicked: (debtee) => dispatch({type: "NewDebteeSelected", payload: {debtee}}),
  })
)(DebteePickerOverlay)
