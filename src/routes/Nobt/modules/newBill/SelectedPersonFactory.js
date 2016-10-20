import SplitStrategyNames from "../../../../const/SplitStrategyNames";
import _debug from "debug";

const log = _debug("SelectedPersonFactory");

export default class SelectedPersonFactory {

  constructor(splitNameStrategyName) {
    this.splitNameStrategyName = splitNameStrategyName;
  }

  getInvolvedPersonData(selectedPersons, amount) {
    if (this.splitNameStrategyName === SplitStrategyNames.EQUAL) {
      return this.splitEqually(selectedPersons, amount);
    }
    if (this.splitNameStrategyName === SplitStrategyNames.UNEQUAL) {
      return SelectedPersonFactory.splitUnequally(selectedPersons, amount);
    }
    if (this.splitNameStrategyName === SplitStrategyNames.PERCENTAGE) {
      return SelectedPersonFactory.splitByPercentage(selectedPersons, amount);
    }

    log("no splitting strategy found", mappedPersons);

    return [];
  }

  splitEqually(persons, amount) {

    var selectedPersons = persons.filter(p => p.value === 1);

    if (selectedPersons.length === 0) {
      return {involvedPersonsAreValid: false, involvedPersonsCalculationInfo: {}, involvedPersons: []};
    }

    const share = Math.round(amount / selectedPersons.length * 100) / 100;
    const roundingError = amount - share * selectedPersons.length;

    const mappedPersons = selectedPersons.map(s => ({name: s.name, amount: share, value: s.value}));
    mappedPersons[ 0 ].amount += roundingError;

    return {
      involvedPersonsAreValid: true,
      involvedPersonsCalculationInfo: {},
      involvedPersons: mappedPersons
    };
  }

  static splitUnequally(selectedPersons, amount) {

    if (selectedPersons.length === 0) {
      return {involvedPersonsAreValid: amount === 0, involvedPersonsCalculationInfo: {remainingAmount: amount}, involvedPersons: []};
    }

    const mappedPersons = selectedPersons.map(s => ({name: s.name, amount: s.value, value: s.value}));
    var currentAmount = mappedPersons.reduce((sum, person) => sum + person.amount || 0, 0);

    return {
      involvedPersonsAreValid: currentAmount === amount,
      involvedPersonsCalculationInfo: { remainingAmount: amount - currentAmount },
      involvedPersons: mappedPersons
    };
  }

  static splitByPercentage(selectedPersons, amount) {
    if (selectedPersons.length === 0) {
      return {involvedPersonsAreValid: false, involvedPersonsCalculationInfo: { remainingPercentage: 100}, involvedPersons: []};
    }

    var sumOfPercentages = selectedPersons.reduce((sum, c) => sum + c.value, 0);

    const calculateAmountShare = (amount, percentage) => {
      var percentFactor = (percentage / 100);
      return Math.round(amount * percentFactor *100)/100;
    };

    var recalculatedPersons = selectedPersons.map(s => ({name: s.name, amount: calculateAmountShare(amount, s.value), value: s.value}));

    if(sumOfPercentages === 100){
      const roundingError = (amount - recalculatedPersons.reduce((sum, c) => sum + c.amount, 0)) || 0;
      recalculatedPersons[ 0 ].amount += roundingError;
    }

    return {
      involvedPersonsAreValid: sumOfPercentages === 100,
      involvedPersonsCalculationInfo: { remainingPercentage: 100 - sumOfPercentages },
      involvedPersons: recalculatedPersons
    };
  }
}
