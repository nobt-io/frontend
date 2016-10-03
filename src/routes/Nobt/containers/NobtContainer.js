import { connect } from 'react-redux'
import { actionCreator } from '../modules/Nobt'

import Nobt from '../components/Nobt'

const mapActionCreators = {
  setNobt: (name) => actionCreator.setNobt(name)
};

const mapStateToProps = (state) => ({
  nobt: state.Nobt.nobt
});

export default connect(mapStateToProps, mapActionCreators)(Nobt)
