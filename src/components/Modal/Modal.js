import React from "react";
import styles from "./Modal.scss";
import Modal from "react-responsive-modal";

export const LowerScreenModal = (props) => {

  const headerIsEmpty = header == '';

  return (
    <Modal overlayClassName={styles.overlay} modalClassName={styles.modal} open={props.active} onClose={props.onClose}>
      <div className={styles.content}>
        <div className={headerIsEmpty ? "" : styles.header}>{props.header}</div>
        {props.children}
      </div>
    </Modal>
  );
};

LowerScreenModal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool
};

LowerScreenModal.defaultProps = {
  onClose: () => { },
  active: false,
  header: ''
};

export default LowerScreenModal;
