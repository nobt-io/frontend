import React from "react";
import HOList from "containers/HOList";
import Input from "react-toolbox/lib/input";
import { ListItem } from "react-toolbox/lib/list";
import Overlay from "components/Overlay";
import { Person, AvatarPosition } from "components/Person";
import { AvatarSize } from "components/Avatar";
import Visibility from "const/Visibility";
import styles from "./DebteePicker.scss";
import listItemTheme from "./ListItemTheme.scss";
import inputTheme from "../InputTheme.scss";

export default class DebteePicker extends React.Component {

  state = {
    overlayVisibility: Visibility.HIDDEN,
  };

  handleOnPersonPicked = (person) => {
    this.props.onDebteePicked(person);
    this.closeOverlay();
  };

  closeOverlay = () => {
    this.setState({overlayVisibility: Visibility.HIDDEN})
  };

  openOverlay = () => {
    this.setState({overlayVisibility: Visibility.VISIBLE})
  };

  render = () => (
    <div className={this.props.className}>

      <Input theme={inputTheme} icon="person" placeholder="Who paid?" value={this.props.value} onFocus={this.openOverlay} />

      <Overlay visibility={this.state.overlayVisibility} onClickOutside={this.closeOverlay}>
        <div className={styles.container}>
          <h3>Who paid?</h3>
          <HOList
            selectable
            items={this.props.names}
            renderItem={ (name) => (
              <ListItem rightIcon={ name === this.props.value ? "done" : "" } theme={listItemTheme} key={name} onClick={ () => this.handleOnPersonPicked(name) }>
                <Person avatarSize={AvatarSize.BIG} avatarPosition={AvatarPosition.LEFT} name={name} />
              </ListItem>
            ) }
          />
        </div>
      </Overlay>
    </div>
  )

  static propTypes = {
    value: React.PropTypes.string,
    names: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onDebteePicked: React.PropTypes.func.isRequired
  }
}
