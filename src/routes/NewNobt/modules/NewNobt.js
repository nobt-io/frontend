import _debug from "debug";
import { createNobt } from "api/api";

export const actionNames = {
  CURRENCY_SELECTION_CHANGED: 'NewNobt.CURRENCY_SELECTION_CHANGED',
  NOBT_NAME_CHANGED: 'NewNobt.NOBT_NAME_CHANGED',
  ADD_PERSON: "NewNobt.ADD_PERSON",
  REMOVE_PERSON: "NewNobt.REMOVE_PERSON",
};

export const actionFactory = {
  currencySelectionChanged: (newCurrency) => ({type: actionNames.CURRENCY_SELECTION_CHANGED, payload: {newCurrency}}),
  nobtNameChanged: (newName) => ({type: actionNames.NOBT_NAME_CHANGED, payload: {newName}}),
  addPerson: (name) => ({type: actionNames.ADD_PERSON, payload: {name}}),
  removePerson: (name) => ({type: actionNames.REMOVE_PERSON, payload: {name}}),
  createNobt: () => {
    return (dispatch, getState) => {

      var state = getState().NewNobt;

      var nobtToCreate = {
        nobtName: state.chosenName,
        currency: state.selectedCurrency,
        explicitParticipants: state.personNames
      };

      return createNobt(nobtToCreate);
    };
  }
};

const actionHandlers = {
  [actionNames.CURRENCY_SELECTION_CHANGED]: (state, action) => {
    return {...state, selectedCurrency: action.payload.newCurrency};
  },
  [actionNames.NOBT_NAME_CHANGED]: (state, action) => {
    return {...state, chosenName: action.payload.newName};
  },
  [actionNames.ADD_PERSON]: (state, action) => {

    const nameToAdd = action.payload.name;
    const existingNames = state.personNames;

    if (existingNames.find(name => name === nameToAdd) !== undefined) {
      _debug(actionNames.ADD_PERSON)(`Person with name ${nameToAdd} already exists.`);
      return state;
    }

    return {...state, personNames: [ ...existingNames, nameToAdd ]};
  },
  [actionNames.REMOVE_PERSON]: (state, action) => {

    const nameToRemove = action.payload.name;
    const newNames = state.personNames.filter(name => name !== nameToRemove);

    return {...state, personNames: newNames};
  }
};

const initialState = {
  selectedCurrency: "EUR",
  chosenName: "",
  personNames: []
};

export default function newNobtReducer(state = initialState, action) {
  const handler = actionHandlers[ action.type ]
  return handler ? handler(state, action) : state
}
