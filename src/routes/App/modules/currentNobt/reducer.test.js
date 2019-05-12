import reducer, { initialState } from './reducer';
import {
  fetchNobtFailed,
  fetchNobtStarted,
  fetchNobtSucceeded,
  UPDATE_FETCH_NOBT_STATUS,
} from './actions';
import { AsyncActionStatus } from '../../../../const/AsyncActionStatus';

describe(`Action ${UPDATE_FETCH_NOBT_STATUS}`, () => {
  it('should combine transactions and debts for backwards compatiblity', () => {
    let newState = executeAsyncAction(
      initialState,
      fetchNobtSucceeded({
        data: {
          transactions: [{}],
          debts: [{}],
        },
      })
    );

    expect(newState.data.transactions).toEqual([{}, {}]);
  });

  it('should map name', () => {
    let newState = executeAsyncAction(
      initialState,
      fetchNobtSucceeded({
        data: {
          name: 'Test',
        },
      })
    );

    expect(newState.data.name).toEqual('Test');
  });

  it('should handle missing transactions property', () => {
    let newState = executeAsyncAction(
      initialState,
      fetchNobtSucceeded({
        data: {
          debts: [{}, {}],
        },
      })
    );

    expect(newState.data.transactions).toEqual([{}, {}]);
  });

  it('should handle missing debts property', () => {
    let newState = executeAsyncAction(
      initialState,
      fetchNobtSucceeded({
        data: {
          transactions: [{}, {}],
        },
      })
    );

    expect(newState.data.transactions).toEqual([{}, {}]);
  });

  it(`should handle fetchNobtStarted`, () => {
    const newState = reducer(initialState, fetchNobtStarted());

    expect(newState.fetchNobtStatus).toEqual(AsyncActionStatus.IN_PROGRESS);
  });

  it(`should handle fetchNobtFailed`, () => {
    const newState = reducer(initialState, fetchNobtFailed());

    expect(newState.fetchNobtStatus).toEqual(AsyncActionStatus.FAILED);
  });
});

let executeAsyncAction = function(previousState, asyncAction) {
  let newState;

  const dispatch = action => {
    if (typeof action === 'function') {
      action(dispatch);
    } else {
      newState = reducer(previousState, action);
    }
  };

  asyncAction(dispatch);

  return newState;
};
