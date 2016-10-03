import { connect } from 'react-redux'
import { nobtActionFactory } from '../modules/Nobt'

import Nobt from '../components/Nobt'

const mapActionCreators = {
  loadNobt: (id) => nobtActionFactory.loadNobt(id)
};

const mapStateToProps = (state) => ({
  nobt: state.Nobt.nobt
});

export default connect(mapStateToProps, mapActionCreators)(Nobt)
