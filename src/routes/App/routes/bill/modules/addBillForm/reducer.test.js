import { addBillFormReducer, initialState } from "./reducer";
import { NEW_DEBTEE_SELECTED, NEW_MEMBER_ADDED, newDebteeSelected, newMemberAdded } from "./actions";

describe(`Action ${NEW_DEBTEE_SELECTED}`, () => {

  it("should add new debtee if not yet present in the current bill", () => {

    let previousState = initialState;
    let expectedState = {
      ...initialState,
      debtee: "Max",
      personValues: [
        {name: "Max", value: true}
      ]
    };


    let newState = addBillFormReducer(previousState, newDebteeSelected("Max"));


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


    let newState = addBillFormReducer(previousState, newDebteeSelected("Max"));


    expect(newState).toEqual(expectedState)
  });
});

describe(`Action ${NEW_MEMBER_ADDED}`, () => {

  it('should add new member if not yet present in the current bill', () => {

    let previousState = initialState;
    let expectedState = {
      ...initialState,
      personValues: [
        {name: "Max", value: true}
      ]
    };


    let newState = addBillFormReducer(previousState, newMemberAdded("Max"));


    expect(newState).toEqual(expectedState)
  })

});
