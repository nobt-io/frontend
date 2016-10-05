import React from 'react'
import styles from './Modal.scss'
import Modal from 'react-responsive-modal';

export const LowerScreenModal = (props) => {

  const onClose = props.onClose || (() => {
    });
  const active = props.active || false;

  const header = props.header || '';
  const headerObj = header == '' ? (<div></div>) : (<div className={styles.header}>{header}</div> );

  return (
    <Modal overlayClassName={styles.overlay} modalClassName={styles.modal} open={active} onClose={onClose}>
      <div className={styles.content}>
        {headerObj}
        {props.children}
      </div>
    </Modal>
  );
};

export default LowerScreenModal;
