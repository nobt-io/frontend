import { connect } from "react-redux";
import { nobtActionFactory } from "../modules/Nobt";
import Nobt from "../components/Nobt";

const mapActionCreators = {
  loadNobt: (id) => nobtActionFactory.loadNobt(id),
  changeTab: (tabName) => nobtActionFactory.changeTab(tabName),
  changeExpenseViewInfo: (filter, sort) => nobtActionFactory.changeExpenseViewInfo(filter, sort),
};

const mapStateToProps = (state) => ({
  name: state.Nobt.name,
  total: state.Nobt.total,
  members: state.Nobt.members,
  tabIndex: state.Nobt.tabIndex,
  transactions: state.Nobt.transactions,
  expenses: state.Nobt.expenses,
  expensesViewInfo: state.Nobt.expensesViewInfo,
  expensesFiltered: state.Nobt.expensesFiltered
});

export default connect(mapStateToProps, mapActionCreators)(Nobt)
