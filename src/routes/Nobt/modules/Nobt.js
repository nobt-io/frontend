const actionNames = {
  SET_NOBT: 'Nobt.SET_NOBT'
};


export const actionCreator = {
  setNobt: function(nobt){
    return {
      type: actionNames.SET_NOBT,
      payload: nobt
    }
  }
};

const actionHandlers = {
  [actionNames.SET_NOBT]: (state, action) => {
    console.log("setNOBT", action.payload);
    return {...state, nobt: action.payload.nobt};
  }
};

const initialState = {
  nobt: {}
};

export default function nobtReducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
