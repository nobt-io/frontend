export const actionNames = {
  ACTION_NAME: '<%= pascalEntityName %>.ACTION_NAME'
}

const initialState = { }

export const actionCreator = {
  actionCreatorOne: function(value){
    return {
      type: actionNames.ACTION_NAME,
      payload: value
    }
  }
}

const actionHandlers = {
  [ACTION_NAME]: (state, action) => state
}

export default function <%= camelEntityName %>Reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
