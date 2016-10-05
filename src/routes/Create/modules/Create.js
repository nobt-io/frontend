import { createNobt } from "api/api";

const actionNames = {
  ADD_PERSON: 'Create.ADD_PERSON',
  REMOVE_PERSON: 'Create.REMOVE_PERSON',
  SET_NOBTNAME: 'Create.SET_NOBTNAME',
  LOADING_STARTED: 'Create.LOADING_STARTED',
};

export const actionCreator = {
  addPerson: function (name) {
    return {
      type: actionNames.ADD_PERSON,
      payload: {name: name}
    }
  },
  removePerson: function (name) {
    return {
      type: actionNames.REMOVE_PERSON,
      payload: {name}
    }
  },
  setNobtName: function (name) {
    return {
      type: actionNames.SET_NOBTNAME,
      payload: {name}
    }
  },
  createNobt: () => {
    return (dispatch, getState) => {

      var createState = getState().Create;

      var nobtToCreate = {
        nobtName: createState.nobtName,
        currency: "EUR",
        explicitParticipants: createState.persons
      };

      return createNobt(nobtToCreate);
    }
  }
};

export const actionHandlers = {
  [actionNames.ADD_PERSON]: (state, action) => {
    var persons = [action.payload.name, ...state.persons];
    return {...state, persons};
  },
  [actionNames.REMOVE_PERSON]: (state, action) => {
    var persons = state.persons.filter(person => person !== action.payload.name);
    return {...state, persons};
  },
  [actionNames.SET_NOBTNAME]: (state, action) => {
    var nobtName = action.payload.name;
    return {...state, nobtName};
  },
  [actionNames.LOADING_STARTED]: (state, action) => {
    return {...state, loading: true};
  }
}

const initialState = {
  persons: [],
  loading: false
}

export default function createReducer(state = initialState, action) {
  const handler = actionHandlers[action.type]

  return handler ? handler(state, action) : state
}
