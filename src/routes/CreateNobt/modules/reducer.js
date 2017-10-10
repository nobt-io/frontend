import {
  ADD_PERSON, CHANGE_NOBT_NAME, ENTER_KEY_PRESSED, REMOVE_PERSON, SELECT_CURRENCY, UPDATE_CREATE_NOBT_STATUS,
  UPDATE_NAME_OF_PERSON_TO_ADD
} from "./actions"
import AsyncActionStatus from "../../../const/AsyncActionStatus"

const handlers = {

  [SELECT_CURRENCY]: (state, action) => {
    return {...state, selectedCurrency: action.payload.newCurrency};
  },

  [CHANGE_NOBT_NAME]: (state, action) => {
    return {...state, chosenName: action.payload.newName};
  },

  [ADD_PERSON]: (state, action) => {

    const nameToAdd = state.personToAdd;
    const existingNames = state.personNames;

    if (existingNames.find(name => name === nameToAdd) !== undefined) {
      _debug(ADD_PERSON)(`Person with name '${nameToAdd}' already exists.`);
      return state;
    }

    return {
      ...state,
      personNames: [ ...existingNames, nameToAdd ],
      personToAdd: ""
    };
  },

  [REMOVE_PERSON]: (state, action) => {

    const nameToRemove = action.payload.name;
    const newNames = state.personNames.filter(name => name !== nameToRemove);

    return {...state, personNames: newNames};
  },

  [UPDATE_CREATE_NOBT_STATUS]: (state, action) => {

    let newState = updateCreateNobtStatusActionPayloadHandler[ action.payload.status ](action.payload);

    return {
      ...state,
      ...newState,
      createNobtStatus: action.payload.status
    }
  },

  [UPDATE_NAME_OF_PERSON_TO_ADD]: (state, action) => {

    return {
      ...state,
      personToAdd: action.payload.name,
    }
  }
};

const updateCreateNobtStatusActionPayloadHandler = {
  [AsyncActionStatus.IN_PROGRESS]: () => {},
  [AsyncActionStatus.SUCCESSFUL]: (payload) => ({createdNobtId: payload.id}),
  [AsyncActionStatus.FAILED]: () => {},
};

const initialState = {
  selectedCurrency: "EUR",
  chosenName: "",
  personNames: [],
  personToAdd: "",
  createNobtStatus: null,
  createdNobtId: ""
};

let newNobtReducer = (state = initialState, action) => {
  const handler = handlers[ action.type ]
  return handler ? handler(state, action) : state
};

export default newNobtReducer;
