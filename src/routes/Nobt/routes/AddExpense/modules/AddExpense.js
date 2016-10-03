export const actionNames = {
  ACTION_NAME: 'AddExpense.ACTION_NAME'
}

export const actionCreator = {
  actionCreatorOne: function(value){
    return {
      type: actionNames.ACTION_NAME,
      payload: value
    }
  }
}

const actionHandlers = {
  [actionNames.ACTION_NAME]: (state, action) => state
}

const initialState = { }

export default function addExpenseReducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
