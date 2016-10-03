import {getNobt} from 'api/api';

const actionNames = {
  LOAD_NOBT: 'Nobt.LOAD_NOBT',
  SET_NOBT: 'Nobt.SET_NOBT'
};


export const nobtActionFactory = {
  loadNobt: (id) => {
    return (dispatch, getState) => {
      getNobt(id).then(response => {
        dispatch({type: actionNames.SET_NOBT, payload: {nobt: response.data}});
      }, error => {
        //TODO: error handling
      });
    }
  }
};

const actionHandlers = {
  [actionNames.SET_NOBT]: (state, action) => {
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
