import { connect } from 'react-redux'
import { actionCreator } from '../modules/Create'
import Create from '../components/Create'

const mapActionCreators = {
  addPerson: (name) => actionCreator.addPerson(name)
}

const mapStateToProps = (state) => ({ 
  persons: state.Create.persons
});

export default connect(mapStateToProps, mapActionCreators)(Create)
