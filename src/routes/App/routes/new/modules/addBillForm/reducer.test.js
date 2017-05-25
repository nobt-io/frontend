import { addBillFormReducer, initialState } from "./reducer";

it("should add new debtee if not yet present in the current bill", () => {

  let previousState = initialState;
  let expectedState = {
    ...initialState,
    debtee: "Max",
    personValues: [
      {name: "Max", value: true}
    ]
  };

  let newState = addBillFormReducer(previousState, {
    type: "NewDebteeSelected",
    payload: {debtee: "Max"}
  });

  expect(newState).toEqual(expectedState)
});

it("should only set new debtee if member is already present in the current bill", () => {

  let previousState = {
    ...initialState,
    personValues: [
      {name: "Max", value: true},
      {name: "Peter", value: true},
    ]
  };

  let expectedState = {
    ...initialState,
    debtee: "Max",
    personValues: [
      {name: "Max", value: true},
      {name: "Peter", value: true},
    ]
  };

  let newState = addBillFormReducer(previousState, {
    type: "NewDebteeSelected",
    payload: {debtee: "Max"}
  });

  expect(newState).toEqual(expectedState)
});
