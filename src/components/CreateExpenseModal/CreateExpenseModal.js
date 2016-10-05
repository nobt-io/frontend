import React from 'react'
import styles from './CreateExpenseModal.scss'
import { FullScreenModal } from "components/Modal";

export const CreateExpenseModal = (props) => (
  <FullScreenModal active={props.active} onClose={props.onClose}>

  </FullScreenModal>
);

CreateExpenseModal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  onCreateExpense: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
};
export default CreateExpenseModal
