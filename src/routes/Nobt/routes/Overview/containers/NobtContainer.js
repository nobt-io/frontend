import { connect } from "react-redux";
import { nobtActionFactory } from "../modules/Nobt";
import Nobt from "../components/Nobt";

const mapActionCreators = {
  loadNobt: (id) => nobtActionFactory.loadNobt(id),
  changeTab: (tabName) => nobtActionFactory.changeTab(tabName),
  closeCreateExpenseModal: () => nobtActionFactory.setCreateExpenseModalVisibilty(false),
  openCreateExpenseModal: () => nobtActionFactory.setCreateExpenseModalVisibilty(true),
  createExpense: (expense) => nobtActionFactory.createExpense(expense),
  updateCreateExpenseEditState: (state) => nobtActionFactory.updateCreateExpenseEditState(state),
  changeExpenseViewInfo: (filter, sort) => nobtActionFactory.changeExpenseViewInfo(filter, sort),
};

const mapStateToProps = (state) => ({
  name: state.Nobt.name,
  total: state.Nobt.total,
  members: state.Nobt.members,
  tabIndex: state.Nobt.tabIndex,
  transactions: state.Nobt.transactions,
  expensesViewInfo: state.Nobt.expensesViewInfo,
  expensesFiltered: state.Nobt.expensesFiltered,
  nobtIsEmpty: (state.Nobt.transactions || []).length == 0,
  createExpenseEditState: state.Nobt.createExpenseViewInfo.state,
  showCreateExpenseModal: state.Nobt.createExpenseViewInfo.show
});

export default connect(mapStateToProps, mapActionCreators)(Nobt)
