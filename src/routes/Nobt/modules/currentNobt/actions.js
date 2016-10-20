import Client from "api/api";

export const FETCH_NOBT_STARTED = 'Nobt.FETCH_NOBT_STARTED';
export const FETCH_NOBT_SUCCEEDED = 'Nobt.FETCH_NOBT_SUCCEEDED';
export const FETCH_NOBT_FAILED = 'Nobt.FETCH_NOBT_FAILED';

function fetchNobtStarted(id) {
  return {
    type: FETCH_NOBT_STARTED,
    payload: {
      id
    }
  }
}

function fetchNobtSucceeded(response) {
  return {
    type: FETCH_NOBT_SUCCEEDED,
    payload: {
      nobt: response.data
    }
  }
}

function fetchNobtFailed(error) {
  return {
    type: FETCH_NOBT_FAILED,
    payload: {
      error
    }
  }
}

export function fetchNobt(id) {

  return (dispatch) => {

    dispatch(fetchNobtStarted(id));

    Client.fetchNobt(id).then(
      response => dispatch(fetchNobtSucceeded(response)),
      error => dispatch(fetchNobtFailed(error))
    )
  }
}




export const ADD_MEMBER = 'Nobt.ADD_MEMBER';

export function addMember(name) {
  return {
    type: ADD_MEMBER,
    payload: {
      name
    }
  }
}
