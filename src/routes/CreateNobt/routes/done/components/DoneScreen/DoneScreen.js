import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCreatedNobtId } from '../../../../modules/selectors';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styles from './DoneScreen.scss';
import { IconMenu, MenuItem } from 'react-toolbox-legacy/lib/menu';
import { IconButton } from 'react-toolbox-legacy/lib/button';
import { Snackbar } from 'react-toolbox-legacy';
import copyToClipboard from 'copy-to-clipboard';

const DoneScreen = props => {
  const [snakeBarVisible, setSnakeBarVisible] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const nobtId = props.nobtId;
  const absoluteLinkToNobt = `${location.href}/${nobtId}`;
  const relativeLinkToNobt = `/${nobtId}`;

  useEffect(() => {
    if (!nobtId) {
      history.replace('/create/name');
    }
  }, [nobtId]);

  return (
    <div>
      <div className={styles.topContainer}>
        <div className={styles.checkContainer}>
          <i className="fa fa-check-circle" />
        </div>
        <h1>Congratulations</h1>
        <p>Your nobt was created successfully.</p>
      </div>
      <div className={styles.linkSection}>
        <label>Link to your nobt:</label>
        <div className={styles.nobtLinkContainer}>
          <Link to={relativeLinkToNobt}>{`nobt.io${relativeLinkToNobt}`}</Link>
          <div>
            <IconButton
              icon="content_copy"
              onClick={() => {
                copyToClipboard(absoluteLinkToNobt);
                setSnakeBarVisible(true);
              }}
            />
            <IconMenu icon="share" menuRipple>
              <MenuItem
                icon={<i className="fa fa-whatsapp" />}
                caption="Whatsapp"
                onClick={() =>
                  (window.location.href = `whatsapp://send?text=${absoluteLinkToNobt}`)
                }
              />
              <MenuItem
                icon={<i className="fa fa-telegram" />}
                caption="Telegram"
                onClick={() =>
                  (window.location.href = `tg://msg_url?url=${absoluteLinkToNobt}`)
                }
              />
              <MenuItem
                icon={<i className="fa fa-envelope-o" />}
                caption="E-Mail"
                onClick={() =>
                  (window.location.href = `mailto:?body=${absoluteLinkToNobt}`)
                }
              />
            </IconMenu>
          </div>
        </div>
        <p className={styles.note}>
          Share this link with anyone you want to split bills with.
        </p>
      </div>

      <Snackbar
        label="Link copied to clipboard."
        active={snakeBarVisible}
        onTimeout={() => setSnakeBarVisible(false)}
        timeout={1500}
        type="accept"
      />
    </div>
  );
};

export default connect(
  state => ({
    nobtId: getCreatedNobtId(state),
  }),
  {}
)(DoneScreen);
