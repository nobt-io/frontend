import SplitStrategyNames from "const/SplitStrategyNames";

export default class SelectedPersonFactory {

  constructor(splitNameStrategyName) {
    this.splitNameStrategyName = splitNameStrategyName;
  }

  createPersons(selectedPersons, amount) {

    if(this.splitNameStrategyName == SplitStrategyNames.EQUAL) return this.splitEqually(selectedPersons, amount);

    return [];
  }

  splitEqually(selectedPersons, amount) {

    if(selectedPersons .length == 0) return [];

    const share = Math.round(amount / selectedPersons.length * 100) / 100;
    const roundingError = amount - share * selectedPersons.length;

    const mappedPersons = selectedPersons.map(s => ({name: s.name, amount: share, value: 1}));
    mappedPersons[ 0 ].value += roundingError;

    return mappedPersons;
  }
}
