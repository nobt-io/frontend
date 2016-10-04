import {getNobt} from 'api/api';

import {actionHandlers as globalNobtActionHandlers, actionFactory as globalNobtActionFactory} from '../../../modules/NobtModule'

const actionNames = {
};


export const nobtActionFactory = {...globalNobtActionFactory,
};

const actionHandlers = {...globalNobtActionHandlers,
};

export const initialState = {
  total: 0,
  name: '',
  member: []
};

export default function nobtReducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
