import { connect } from "react-redux";
import { nobtActionFactory } from "../modules/Nobt";
import Nobt from "../components/Nobt";
import { getName, getCurrency, getMembers, getExpenses, getDebtSummaries, getTotal, getFilteredExpenses, getActiveTabIndex } from '../selectors'

const mapActionCreators = {
  loadNobt: (id) => nobtActionFactory.loadNobt(id),
  changeTab: (tabName) => nobtActionFactory.changeTab(tabName),
  closeCreateExpenseModal: () => nobtActionFactory.setCreateExpenseModalVisibilty(false),
  openCreateExpenseModal: () => nobtActionFactory.setCreateExpenseModalVisibilty(true),

  createExpense: (expense) => nobtActionFactory.createExpense(expense),

  updateCreateExpenseEditState: (state) => nobtActionFactory.updateCreateExpenseEditState(state),

  updateExpensesFilter: (filter) => nobtActionFactory.updateExpensesFilter(filter),
  updateExpenseSortProperty: (property) => nobtActionFactory.updateExpenseSortProperty(property),
};

const mapStateToProps = (state) => {
  return {
    name: getName(state),
    currency: getCurrency(state),
    total: getTotal(state),
    members: getMembers(state),
    debtSummaries: getDebtSummaries(state),
    expenses: getFilteredExpenses(state),
    activeTabIndex: getActiveTabIndex(state),
    isNobtEmpty: getExpenses(state).length === 0,

    createExpenseEditState: state.Nobt.createExpenseViewInfo.state,
    showCreateExpenseModal: state.Nobt.createExpenseViewInfo.show
  }
};

export default connect(mapStateToProps, mapActionCreators)(Nobt)
