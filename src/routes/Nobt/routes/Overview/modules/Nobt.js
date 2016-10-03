import {getNobt} from 'api/api';
import debug from 'debug';

const actionNames = {
  LOAD_NOBT: 'Nobt.LOAD_NOBT',
  SET_NOBT: 'Nobt.SET_NOBT',
  CHANGE_TAB: 'Nobt.CHANGE_TAB',
  SHOW_ADD_EXPENSE_DRAWER: 'Nobt.SHOW_ADD_EXPENSE_DRAWER',
  HIDE_ADD_EXPENSE_DRAWER: 'Nobt.HIDE_ADD_EXPENSE_DRAWER',
};


export const nobtActionFactory = {
  changeTab: (tabName) => ({type: actionNames.CHANGE_TAB, payload: {tabName: tabName}}),

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

    var total = action.payload.nobt.expenses.reduce((acc, cur) => acc + cur, 0);
    var name = action.payload.nobt.name;
    var member = action.payload.nobt.participatingPersons;

    return {...state, name : name, total: total, member: member};
  },
  [actionNames.CHANGE_TAB]: (state, action) => {

    var tabNameIndexMapping = {
      'transactions': 0,
      'expenses': 1
    };

    var tabIndex = tabNameIndexMapping[action.payload.tabName] || 0;

    // TODO this is called often, maybe avoid somehow
    // debug(actionNames.CHANGE_TAB)(`Calculated selected tab index ${tabIndex} from name '${action.payload.tabName}'.`);

    return {...state, tabIndex : tabIndex};
  }
};

const initialState = {
  total: 0,
  name: '',
  member: [],
  addExpenseOverlayOpen: false
};

export default function nobtReducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
