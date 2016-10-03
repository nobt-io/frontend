import {getNobt} from 'api/api';

const actionNames = {
  LOAD_NOBT: 'Nobt.LOAD_NOBT',
  SET_NOBT: 'Nobt.SET_NOBT',
  CHANGE_TAB: 'Nobt.CHANGE_TAB',
};


export const nobtActionFactory = {
  changeTab: (tabIndex) => ({type: actionNames.CHANGE_TAB, payload: {tabIndex: tabIndex}}),

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

    console.log(action.payload.nobt);

    var total = action.payload.nobt.expenses.reduce((acc, cur) => acc + cur, 0);
    var name = action.payload.nobt.name;
    var member = action.payload.nobt.participatingPersons;

    return {...state, name : name, total: total, member: member};
  },
  [actionNames.CHANGE_TAB]: (state, action) => {
    var tabIndex = action.payload.tabIndex;

    return {...state, tabIndex : tabIndex};
  }
};

const initialState = {
  total: 0,
  name: '',
  member: []
};

export default function nobtReducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
