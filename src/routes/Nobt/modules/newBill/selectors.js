import { createSelector } from "reselect";
import SelectedPersonFactory from "./SelectedPersonFactory";
import _debug from "debug";

export const getNewBillViewInfo = (state) => state.Nobt.newBill;
export const getNewBillMetaData = createSelector([getNewBillViewInfo], (newBill) => {

  const metaDataIsValid =
    (newBill.subject || "").length !== 0 &&
    (newBill.amount || 0) > 0;

  return {
    active: newBill.show,
    subject: newBill.subject,
    amount: newBill.amount,
    paidByPerson: newBill.paidByPerson,
    creationDate: newBill.creationDate,
    splitStrategy: newBill.splitStrategy,
    metaDataIsValid: metaDataIsValid
  };
});

export const getNewBillPersonData = createSelector([getNewBillViewInfo], (createBill) => {

  var strategy = createBill.splitStrategy;

  var persons = createBill.involvedPersons[strategy];
  var amount = createBill.amount;

  var personFactory = new SelectedPersonFactory(strategy);
  var billPersonData = personFactory.getInvolvedPersonData(persons, amount);

  _debug('selectors:getNewBillPersonData')(billPersonData);

  return billPersonData;

});
