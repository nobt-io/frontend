export const actionNames = {
  ADD_PERSON: 'Create.ADD_PERSON',
  REMOVE_PERSON: 'Create.REMOVE_PERSON',
  SET_NOBTNAME: 'Create.SET_NOBTNAME'
}

export const actionCreator = {
  addPerson: function(name){
    return {
      type: actionNames.ADD_PERSON,
      payload: {name: name}
    }
  },
  removePerson: function(name){
    return {
      type: actionNames.REMOVE_PERSON,
      payload: {name}
    }
  },
  setNobtName: function(name){
    return {
      type: actionNames.SET_NOBTNAME,
      payload: {name}
    }
  }
}

export const actionHandlers = {
  [actionNames.ADD_PERSON]: (state, action) => {
    console.log("ADD_PERSON", action.payload);
    var persons = [action.payload.name, ...state.persons];
    return {...state, persons};
  },
  [actionNames.REMOVE_PERSON]: (state, action) => {
    console.log("REMOVE_PERSON", action.payload);

    var persons = state.persons.filter(person => person !== action.payload.name);
    return {...state, persons};
  },
  [actionNames.SET_NOBTNAME]: (state, action) => {
    console.log("SET_NOBTNAME", action.payload);

    var nobtName = action.payload.name;
    return {...state, nobtName};
  }
}

const initialState = {
  persons: []
}

export default function createReducer (state = initialState, action) {
  const handler = actionHandlers[action.type]

  return handler ? handler(state, action) : state
}
