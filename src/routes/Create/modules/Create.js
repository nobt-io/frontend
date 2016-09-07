export const actionNames = {
  ADD_PERSON: 'Create.ADD_PERSON'
}

export const actionCreator = {
  addPerson: function(name){
    return {
      type: actionNames.ADD_PERSON,
      payload: {name}
    }
  }
}

export const actionHandlers = {
  [actionNames.ADD_PERSON]: (state, action) => {
    var persons = [action.payload.name, ...state.persons];
    return {...state, persons};
  }
}

const initialState = {
  persons: []
}

export default function createReducer (state = initialState, action) {
  const handler = actionHandlers[action.type]

  return handler ? handler(state, action) : state
}
