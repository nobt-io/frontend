import { connect } from "react-redux";

import NewNobt from "../components/NewNobt";

import { addPerson, removePerson, createNobt, changeNobtName, selectCurrency } from "../modules/actions"
import AsyncActionStatus from "const/AsyncActionStatus"
import { getSelectedCurrency, getChosenName, getPersonNames, isEvilTwinFactory, canCreateNobt, getCreationStatus, getCreatedNobtId } from "../modules/selectors";

const mapActionCreators = {
  addPerson,
  removePerson,
  changeNobtName,
  selectCurrency,
  createNobt
};

const mapStateToProps = (state) => ({
  selectedCurrency: getSelectedCurrency(state),
  chosenName: getChosenName(state),
  personNames: getPersonNames(state),
  isEvilTwin: isEvilTwinFactory(state),
  canCreateNobt: canCreateNobt(state),
  creationInProgress: getCreationStatus(state) === AsyncActionStatus.IN_PROGRESS,
  creationSuccessful: getCreationStatus(state) === AsyncActionStatus.SUCCESSFUL,
  createdNobtId: getCreatedNobtId(state),
});

export default connect(mapStateToProps, mapActionCreators)(NewNobt);
