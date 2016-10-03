import { connect } from 'react-redux'
import { nobtActionFactory } from '../modules/Nobt'

import Nobt from '../components/Nobt'

const mapActionCreators = {
  loadNobt: (id) => nobtActionFactory.loadNobt(id),
  changeTab: (tabName) => nobtActionFactory.changeTab(tabName),
};

const mapStateToProps = (state) => ({
  name: state.Nobt.name,
  total: state.Nobt.total,
  members: state.Nobt.members,
  tabIndex: state.Nobt.tabIndex,
  transactions: state.Nobt.transactions,
  expenses: state.Nobt.expenses
});

export default connect(mapStateToProps, mapActionCreators)(Nobt)
