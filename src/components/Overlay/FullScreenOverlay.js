import React from "react";
import styles from "./FullScreenOverlay.scss";
import Modal from "react-responsive-modal";

const FullScreenOverlay = (props) => {

  return (
    <Modal overlayClassName={styles.overlay} modalClassName={styles.modal} open={props.active} onClose={props.onClose}
           showCloseIcon={false}>
      <div className={styles.content}>
        {props.children}
      </div>
    </Modal>
  );
};

FullScreenOverlay.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool,
};

FullScreenOverlay.defaultProps = {
  active: false,
  header: ''
};

export default FullScreenOverlay ;
