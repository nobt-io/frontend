import Client from 'api';

export const UPDATE_FETCH_NOBT_STATUS = 'Nobt.UPDATE_FETCH_NOBT_STATUS';
export const INVALIDATE_NOBT = 'Nobt.INVALIDATE';

export function deleteExpense(e) {
  return dispatch => {
    Client.delete(e.actions.delete).then(() => dispatch(invalidateNobt()));
  };
}

export function invalidateNobt() {
  return {
    type: INVALIDATE_NOBT,
  };
}

export const ADD_MEMBER = 'Nobt.ADD_MEMBER';

export function addMember(name) {
  return {
    type: ADD_MEMBER,
    payload: {
      name,
    },
  };
}
