import { connect } from "react-redux";
import { actionCreator } from "../modules/Create";
import { nobtActionFactory as nobtActionCreator } from "../../Nobt/routes/Overview/modules/Nobt";
import Create from "../components/Create";

const mapActionCreators = {
  addPerson: (name) => actionCreator.addPerson(name),
  removePerson: (name) => actionCreator.removePerson(name),
  setNobtName: (name) => actionCreator.setNobtName(name),
  createNobt: () => actionCreator.createNobt(),
  setNobt: () => nobtActionCreator.setNobt()
};

const mapStateToProps = (state) => ({
  persons: state.Create.persons,
  nobtName: state.Create.nobtName,
  loading: state.Create.loading,
});

export default connect(mapStateToProps, mapActionCreators)(Create)
