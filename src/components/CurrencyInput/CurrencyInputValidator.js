const InputValidator = {

  amountsAreEqual: (actualAmount, newAmount) => {

    const amountsAreEqual = (a, n) => a == n;

    return amountsAreEqual(actualAmount, newAmount);
  },

  validateInput: (amount) => {

    const newAmountIsNoValidNumber = (n) => n.match(/^[0-9.,]*$/) == null;
    const getNumberOfOccurringSeparators = (n) => (amount.split(",").length - 1) + (amount.split(".").length - 1);

    const separatorOnCorrectPosition = (n) => {
      var separatorIndex = n.indexOf(',') + n.indexOf('.') + 1;

      var noSeparatorFound = separatorIndex < 0;
      if (noSeparatorFound) {
        return true;
      }

      const digitsAfterSeparator = n.length - (separatorIndex + 1);
      return digitsAfterSeparator <= 2;
    };

    if (newAmountIsNoValidNumber(amount)) {
      return false;
    }
    if (getNumberOfOccurringSeparators(amount) > 1) {
      return false;
    }

    return separatorOnCorrectPosition(amount);
  }
};

export default InputValidator;
