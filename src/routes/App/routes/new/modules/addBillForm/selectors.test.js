import { isExistingMemberFactory } from "./selectors";
import { isTransientMemberFactory } from "./selectors";

let mockState = function () {
  return {
    App: {
      addBillForm: {
        personValues: [
          {
            name: "Felix",
            value: 0
          }
        ],
        debtee: "Matthias"
      },
      currentNobt: {
        data: {
          participatingPersons: [
            "Thomas",
            "David"
          ]
        }
      }
    }
  };
};

it("should check for existing members", () => {

  const isExistingMember = isExistingMemberFactory(mockState());

  expect(isExistingMember("Felix")).toBeTruthy();
  expect(isExistingMember("Matthias")).toBeTruthy();
  expect(isExistingMember("Thomas")).toBeTruthy();
  expect(isExistingMember("David")).toBeTruthy();

  expect(isExistingMember("Martin")).toBeFalsy();

});
