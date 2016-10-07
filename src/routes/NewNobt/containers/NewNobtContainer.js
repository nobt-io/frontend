import { connect } from "react-redux";
import { actionFactory } from "../modules/NewNobt";
import NewNobt from "../components/NewNobt";
import { getSelectedCurrency, getChosenName, getPersonNames, isEvilTwinFactory, isStateValid } from "../selectors";

const mapActionCreators = {
  currencySelectionChanged: (newCurrency) => actionFactory.currencySelectionChanged(newCurrency),
  nobtNameChanged: (newName) => actionFactory.nobtNameChanged(newName),
  addPerson: (name) => actionFactory.addPerson(name),
  removePerson: (name) => actionFactory.removePerson(name),
  createNobt: () => actionFactory.createNobt(),
};

const mapStateToProps = (state) => ({
  selectedCurrency: getSelectedCurrency(state),
  chosenName: getChosenName(state),
  personNames: getPersonNames(state),
  isEvilTwin: isEvilTwinFactory(state),
  isStateValidForCreation: isStateValid(state)
});

export default connect(mapStateToProps, mapActionCreators)(NewNobt);
