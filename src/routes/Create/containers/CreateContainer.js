import { connect } from 'react-redux'
import { actionCreator } from '../modules/Create'
import Create from '../components/Create'

const mapActionCreators = {
  addPerson: (name) => actionCreator.addPerson(name),
  removePerson: (name) => actionCreator.removePerson(name),
  setNobtName: (name) => actionCreator.setNobtName(name)
}

const mapStateToProps = (state) => ({
  persons: state.Create.persons,
  nobtName: state.Create.nobtName,
});

export default connect(mapStateToProps, mapActionCreators)(Create)
