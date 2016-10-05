import React from "react";
import styles from "./FullScreen.scss";
import Modal from "react-responsive-modal";

const FullScreenModal = (props) => {

  return (
    <Modal overlayClassName={styles.overlay} modalClassName={styles.modal} open={props.active} onClose={props.onClose}
           showCloseIcon={false}>
      <div className={styles.content}>
        {props.children}
      </div>
    </Modal>
  );
};

FullScreenModal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool,
};

FullScreenModal.defaultProps = {
  active: false,
  header: ''
};

export default FullScreenModal ;
