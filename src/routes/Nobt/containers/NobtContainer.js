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
  getCreateExpenseMetaData,
  getNewExpensePersonData
} from '../selectors'

const mapActionCreators = {
  loadNobt: (id) => nobtActionFactory.loadNobt(id),
  changeTab: (tabName) => nobtActionFactory.changeTab(tabName),

  //newExpense
  createExpense: (expense) => nobtActionFactory.createExpense(expense),

  closeNewExpenseOverlay: () => nobtActionFactory.setNewExpenseOverlayVisibility(false),
  openNewExpenseOverlay: () => nobtActionFactory.setNewExpenseOverlayVisibility(true),
  setNewExpenseMetaData: (metaInfo) => nobtActionFactory.setNewExpenseMetaData(metaInfo),
  setNewExpensePersonValue: (name, value) => nobtActionFactory.setNewExpensePersonValue(name, value),

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

    newExpenseMetaData: getCreateExpenseMetaData(state),
    newExpensePersonData: getNewExpensePersonData(state)
  };
};

export default connect(mapStateToProps, mapActionCreators)(Nobt)
