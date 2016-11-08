import React from "react";
import HOList from "containers/HOList";
import Input from "react-toolbox/lib/input";
import { ListItem, ListSubHeader, ListDivider } from "react-toolbox/lib/list";
import Overlay from "components/Overlay";
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

      <Input theme={inputTheme} icon="person" placeholder="Who paid?" value={this.props.value || ""} onFocus={this.openOverlay} />

      <Overlay visibility={this.state.overlayVisibility} onClickOutside={this.closeOverlay}>
        <div className={styles.container}>
          <h3>Who paid?</h3>
          <Input placeholder="Enter a name" value={this.state.query} onChange={this.handleOnQueryChanged} />
          <HOList
            selectable
            items={this.props.names}
            renderItem={ (name) => (
              <ListItem rightIcon={ name === this.props.value ? "done" : "" }
                        theme={listItemTheme}
                        key={name}
                        onClick={ () => this.handleOnPersonPicked(name) }>
                <Person avatarSize={AvatarSize.BIG} avatarPosition={AvatarPosition.LEFT} name={name} />
              </ListItem>
            ) }
            shouldRenderItem={ this.nameMatchesQuery }>
            {
              this.hasQuery() && !this.queryHasPerfectMatch() &&
              (
                <span>
                  <ListSubHeader caption="Add new member" />
                  <ListItem rightIcon="person_add" theme={listItemTheme} key={this.state.query} onClick={ this.handleOnNewMemberClicked }>
                    <Person avatarSize={AvatarSize.BIG} avatarPosition={AvatarPosition.LEFT} name={this.state.query} />
                  </ListItem>
                </span>
              )
            }
          </HOList>
        </div>
      </Overlay>
    </div>
  );

  nameMatchesQuery = (name) => {
    var result = name.indexOf(this.state.query);

    log(`nameMatchesQuery: ${name} => ${result}`);

    return result != -1
  };

  queryHasPerfectMatch = () => this.props.names.indexOf(this.state.query) != -1;
  hasQuery = () => this.state.query.length > 0;

  handleOnPersonPicked = (person) => {
    this.props.onDebteePicked(person);
    this.closeOverlay();
  };

  handleOnNewMemberClicked = () => {
    var newMember = this.state.query.trim();
    this.props.onNewMember(newMember);
    this.handleOnPersonPicked(newMember);
  };

  handleOnQueryChanged = (value) => this.setState({query: value});

  closeOverlay = () => this.setState({overlayVisibility: Visibility.HIDDEN, query: ""});
  openOverlay = () => this.setState({overlayVisibility: Visibility.VISIBLE});

  static propTypes = {
    value: React.PropTypes.string,
    names: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onDebteePicked: React.PropTypes.func.isRequired,
    onNewMember: React.PropTypes.func.isRequired
  }
}
