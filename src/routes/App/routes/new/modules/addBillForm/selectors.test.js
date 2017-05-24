import { isExistingMemberFactory } from "./selectors";

it("should check for existing members", () => {

  const isExistingMember = isExistingMemberFactory({
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
  });

  expect(isExistingMember("Felix")).toBeTruthy()
  expect(isExistingMember("Matthias")).toBeTruthy()
  expect(isExistingMember("Thomas")).toBeTruthy()
  expect(isExistingMember("David")).toBeTruthy()

  expect(isExistingMember("Martin")).toBeFalsy()

});
