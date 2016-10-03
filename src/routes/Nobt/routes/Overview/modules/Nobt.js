import {getNobt} from 'api/api';

import {actionHandlers as globalNobtActionHandlers, actionFactory as globalNobtActionFactory} from '../../../modules/NobtModule'

const actionNames = {
  CHANGE_TAB: 'Nobt.CHANGE_TAB',
};


export const nobtActionFactory = {...globalNobtActionFactory,
  changeTab: (tabName) => ({type: actionNames.CHANGE_TAB, payload: {tabName: tabName}}),
};

const actionHandlers = {...globalNobtActionHandlers,
  [actionNames.CHANGE_TAB]: (state, action) => {

    var tabNameIndexMapping = {
      'transactions': 0,
      'expenses': 1
    };

    var tabIndex = tabNameIndexMapping[action.payload.tabName] || 0;

    // TODO this is called often, maybe avoid somehow
    // debug(actionNames.CHANGE_TAB)(`Calculated selected tab index ${tabIndex} from name '${action.payload.tabName}'.`);

    return {...state, tabIndex : tabIndex};
  }};

export const initialState = {
  total: 0,
  name: '',
  member: [],
  tabIndex: 0
};

export default function nobtReducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
