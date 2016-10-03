import { connect } from 'react-redux'
import { nobtActionFactory } from '../modules/Nobt'

import Nobt from '../components/Nobt'

const mapActionCreators = {
  loadNobt: (id) => nobtActionFactory.loadNobt(id),
  changeTab: (tabIndex) => nobtActionFactory.changeTab(tabIndex)
};

const mapStateToProps = (state) => ({
  name: state.Nobt.name,
  total: state.Nobt.total + 10,
  members: state.Nobt.members,
  tabIndex: state.Nobt.tabIndex,
});

export default connect(mapStateToProps, mapActionCreators)(Nobt)
