import React from "react";
import { connect } from "react-redux";
import { getCreatedNobtId } from "../../modules/selectors";
import { Link } from "react-router";
import styles from "./DoneScreen.scss";
import LocationBuilder from "../../../App/modules/navigation/LocationBuilder";
import { IconMenu, MenuItem } from "react-toolbox/lib/menu";
import { CopyToClipboard } from "react-copy-to-clipboard/lib/Component";
import { IconButton } from "react-toolbox/lib/button";
import { Snackbar } from "react-toolbox";

class DoneScreen extends React.Component {

  state = {
    snackbarVisible: false
  };

  absoluteLinkToNobt = () => LocationBuilder.fromWindow().pop().pop().push(this.props.nobtId).absolutePath;
  relativeLinkToNobt = () => LocationBuilder.fromWindow().pop().pop().push(this.props.nobtId).path;

  render = () => (
    <div>
      <div className={styles.topContainer}>
        <div className={styles.checkContainer}><i className="fa fa-check-circle" /></div>
        <h1>Congratulations</h1>
        <p>Your nobt was created successfully.</p>
      </div>
      <div className={styles.linkSection}>
        <label>Link to your nobt:</label>
        <div className={styles.nobtLinkContainer}>
          <Link to={this.relativeLinkToNobt()}>{`nobt.io${this.relativeLinkToNobt()}`}</Link>
          <div>
            <CopyToClipboard text={this.absoluteLinkToNobt()} onCopy={ () => this.setState({snackbarVisible: true}) }>
              <IconButton icon="content_copy" />
            </CopyToClipboard>
            <IconMenu icon='share' menuRipple>
              <MenuItem
                icon={<i className="fa fa-whatsapp" />}
                caption='Whatsapp'
                onClick={ () => window.location.href = `whatsapp://send?text=${this.absoluteLinkToNobt()}` }
              />
              <MenuItem
                icon={<i className="fa fa-telegram" />}
                caption='Telegram'
                onClick={ () => window.location.href = `tg://msg_url?url=${this.absoluteLinkToNobt()}` }
              />
              <MenuItem
                icon={<i className="fa fa-envelope-o" />}
                caption='E-Mail'
                onClick={ () => window.location.href = `mailto:?body=${this.absoluteLinkToNobt()}` }
              />
            </IconMenu>
          </div>
        </div>
        <p className={styles.note}>Share this link with anyone you want to split bills with.</p>
      </div>

      <Snackbar
        label='Link copied to clipboard.'
        active={this.state.snackbarVisible}
        onTimeout={ () => this.setState({snackbarVisible: false}) }
        timeout={1500}
        ref='snackbar'
        type='accept'
      />
    </div>
  )
}

export default connect(
  (state) => ({
    nobtId: getCreatedNobtId(state)
  }),
  {}
)(DoneScreen)
