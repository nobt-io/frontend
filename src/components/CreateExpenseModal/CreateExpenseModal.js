import React from 'react'
import styles from './CreateExpenseModal.scss'
import { FullScreenModal } from "components/Modal";
import Header from "components/Header";

export const CreateExpenseModal = (props) => (
  <FullScreenModal active={props.active} onClose={props.onClose}>
    <Header
      showNobtHeader={false}
      rightButton={{icon: "check_box", onClick: () => props.openCreateExpenseModal(), title: "Create expense"}}
      leftButton={{icon: "arrow_back", onClick: () => props.onClose(), title: "Back"}}/>
    <div></div>
  </FullScreenModal>
);

CreateExpenseModal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  onCreateExpense: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
};
export default CreateExpenseModal
