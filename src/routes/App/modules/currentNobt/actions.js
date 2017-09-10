import Client from "api/api";
import AsyncActionStatus from "const/AsyncActionStatus";
import * as utils from "utils/sleep";

export const UPDATE_FETCH_NOBT_STATUS = 'Nobt.UPDATE_FETCH_NOBT_STATUS';
export const INVALIDATE_NOBT = 'Nobt.INVALIDATE';

function fetchNobtStarted() {
  return {
    type: UPDATE_FETCH_NOBT_STATUS,
    payload: {
      status: AsyncActionStatus.IN_PROGRESS
    }
  }
}

export function fetchNobtSucceeded(response) {
  return (dispatch) => {

    let nobt = response.data;

    dispatch({
      type: UPDATE_FETCH_NOBT_STATUS,
      payload: {
        nobt,
        status: AsyncActionStatus.SUCCESSFUL
      }
    });

    dispatch(updateHtmlTitle(nobt.name));
  }
}

export function updateHtmlTitle(nobtName) {
  return () => {
    document.title = nobtName
  }
}

function fetchNobtFailed(error) {
  return {
    type: UPDATE_FETCH_NOBT_STATUS,
    payload: {
      error,
      status: AsyncActionStatus.FAILED
    }
  }
}

export function fetchNobt(id) {

  return (dispatch) => {

    dispatch(fetchNobtStarted());

    utils.sleep(1000).then(() => {
      Client.fetchNobt(id).then(
        response => dispatch(fetchNobtSucceeded(response)),
        error => dispatch(fetchNobtFailed(error))
      )
    })
  }
}

export function invalidateNobt() {
  return {
    type: INVALIDATE_NOBT
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
