import React from "react";
import HOList from "containers/HOList";
import Input from "react-toolbox/lib/input";
import { ListItem, ListSubHeader, ListDivider } from "react-toolbox/lib/list";
import {Button} from 'react-toolbox/lib/button';
import Overlay from "components/Overlay";
import AddMember from "../AddMember";
import { Person, AvatarPosition } from "components/Person";
import { AvatarSize } from "components/Avatar";
import Visibility from "const/Visibility";
import styles from "./DebteePicker.scss";
import listItemTheme from "./ListItemTheme.scss";
import inputTheme from "../InputTheme.scss";
import _debug from "debug";

const log = _debug("DebteePicker");

export default class DebteePicker extends React.Component {

  state = {
    overlayVisibility: Visibility.HIDDEN,
    query: ""
  };

  render = () => (
    <div className={this.props.className}>
      <Input readOnly theme={inputTheme} icon="person" placeholder="Who paid?" value={this.props.value || ""} onFocus={this.openOverlay}>
        <div onClick={this.openOverlay} className={styles.overlayToAvoidKeyboardPopingUp}></div>
      </Input>

      <Overlay visibility={this.state.overlayVisibility} onClickOutside={this.closeOverlay} className={styles.overlay}>
        <div className={styles.container}>
          <h3>Who paid?</h3>
          <HOList
            className={styles.list}
            selectable
            items={this.props.names}
            renderItem={ (name) => (
              <ListItem rightIcon={ name === this.props.value ? "check_circle" : "radio_button_unchecked" }
                        theme={listItemTheme}
                        key={name}
                        onClick={ () => this.handleOnPersonPicked(name) }>
                <Person avatarSize={AvatarSize.MEDIUM} avatarPosition={AvatarPosition.LEFT} name={name} />
              </ListItem>
            )}>
          </HOList>
          <AddMember members={this.props.names} onNewMember={this.handleOnNewMember}/>
        </div>
      </Overlay>
    </div>
  );

  handleOnNewMember = (person) => {
    this.props.onNewMember(person);
    this.props.onDebteePicked(person);
    this.closeOverlay();
  };

  handleOnPersonPicked = (person) => {
    this.props.onDebteePicked(person);
    this.closeOverlay();
  };
  closeOverlay = () => this.setState({overlayVisibility: Visibility.HIDDEN, query: ""});
  openOverlay = () => this.setState({overlayVisibility: Visibility.VISIBLE});

  static propTypes = {
    value: React.PropTypes.string,
    names: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onDebteePicked: React.PropTypes.func.isRequired,
    onNewMember: React.PropTypes.func.isRequired
  }
}
