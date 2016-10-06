import { connect } from "react-redux";
import { nobtActionFactory } from "../modules/Nobt";
import Nobt from "../components/Nobt";
import {
  getName,
  getCurrency,
  getMembers,
  getExpenses,
  getDebtSummaries,
  getTotal,
  getFilteredExpenses,
  getActiveTabIndex,
  getExpensesFilter,
  getExpensesSortProperty,
  getCreateExpenseState,
  getCreateExpenseSelection
} from '../selectors'

const mapActionCreators = {
  loadNobt: (id) => nobtActionFactory.loadNobt(id),
  changeTab: (tabName) => nobtActionFactory.changeTab(tabName),

  //CreateExpense
  closeCreateExpenseModal: () => nobtActionFactory.setCreateExpenseModalVisibility(false),
  openCreateExpenseModal: () => nobtActionFactory.setCreateExpenseModalVisibility(true),
  createExpense: (expense) => nobtActionFactory.createExpense(expense),
  createExpenseUpdateEditState: (state) => nobtActionFactory.createExpenseUpdateEditState(state),
  createExpenseAddOrUpdateSelectedPerson: (person) => nobtActionFactory.createExpenseAddOrUpdateSelectedPerson(person),
  createExpenseRemoveSelectedPerson: (name) => nobtActionFactory.createExpenseRemoveSelectedPerson(name),

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
    expenseFilter: getExpensesFilter(state),
    expenseSortProperty: getExpensesSortProperty(state),

    activeTabIndex: getActiveTabIndex(state),
    isNobtEmpty: getExpenses(state).length === 0,

    createExpenseState: getCreateExpenseState(state),
    createExpenseSelection: getCreateExpenseSelection(state)
  }
};

export default connect(mapStateToProps, mapActionCreators)(Nobt)
