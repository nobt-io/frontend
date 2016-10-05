import { getNobt } from "api/api";
import debug from "debug";

const actionNames = {
  SET_NOBT: 'AddExpense.SET_NOBT',
  ADD_PERSON: 'AddExpense.ADD_PERSON',
  TOGGLE_PERSON: 'AddExpense.TOGGLE_PERSON',
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
  },
  addPerson: function (name) {
    return {
      type: actionNames.ADD_PERSON,
      payload: {name: name}
    }
  },
  togglePerson: function (name) {
    return {
      type: actionNames.TOGGLE_PERSON,
      payload: {name: name}
    }
  }
};

const actionHandlers = {
  [actionNames.SET_NOBT]: (state, action) => {

    var name = action.payload.nobt.name;
    var members = action.payload.nobt.participatingPersons.reduce((map, person) => {
      map[person] = false;
      return map;
    }, {});

    debug(actionNames.SET_NOBT)(members);

    return {...state, name, members}
  },

  [actionNames.ADD_PERSON]: (state, action) => {

    state.members[action.payload.name] = true;

    return {...state, members: state.members};
  },

  [actionNames.TOGGLE_PERSON]: (state, action) => {

    var checkState = state.members[action.payload.name];
    state.members[action.payload.name] = !checkState;

    return {...state, members: state.members};
  }
};

export const initialState = {
  name: '',
  members: {},
};

export default function nobtReducer(state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
