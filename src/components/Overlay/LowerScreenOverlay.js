import React from "react";
import styles from "./LowerScreenOverlay.scss";
import Modal from "react-responsive-modal";

const LowerScreenOverlay = (props) => {

  const headerIsEmpty = props.header == '';

  return (
    <Modal overlayClassName={styles.overlay} modalClassName={styles.modal} open={props.active} onClose={props.onClose}>
      <div className={styles.content}>
        <div className={headerIsEmpty ? "" : styles.header}>{props.header}</div>
        {props.children}
      </div>
    </Modal>
  );
};

LowerScreenOverlay.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool,
  header: React.PropTypes.string
};

LowerScreenOverlay.defaultProps = {
  active: false,
  header: ''
};

export default LowerScreenOverlay;
