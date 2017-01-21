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

const log = _debug("DebteePicker");

export default class DebteePickerOverlay extends React.Component {

  render = () => {

    let { names, debtee } = this.props.location.state;

    return (
      <div className={this.props.className}>

        <Overlay onClickOutside={this.props.goBack} className={styles.overlay}>
          <div className={styles.container}>
            <h3>Who paid?</h3>
            <HOList
              className={styles.list}
              selectable
              items={names}
              renderItem={ (name) => (
                <ListItem rightIcon={ name === debtee ? "check_circle" : "radio_button_unchecked" }
                          theme={listItemTheme}
                          key={name}
                          onClick={ () => this.handleOnPersonPicked(name) }>
                  <Person avatarSize={AvatarSize.MEDIUM} avatarPosition={AvatarPosition.LEFT} name={name} />
                </ListItem>
              )}>
            </HOList>
            <AddMember members={names} onNewMember={this.handleOnNewMember}/>
          </div>
        </Overlay>
      </div>
    )
  };

  handleOnNewMember = (person) => {
    let path = LocationBuilder.fromWindow().pop().path;

    this.props.replace({
      pathname: path,
      state: { debtee: person, isNewMember: true }
    });
  };

  handleOnPersonPicked = (person) => {
    let path = LocationBuilder.fromWindow().pop().path;

    this.props.replace({
      pathname: path,
      state: { debtee: person, isNewMember: false }
    });
  };
}
