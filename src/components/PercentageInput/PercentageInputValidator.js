const PercentageInputValidator = {

  percentageIsEqual: (percentage, oldPercentage) => {
    return percentage === oldPercentage;
  },

  validateInput: (percentage) => {
    const percentageIsNoValidNumber = (n) => n.match(/^[0-9]*$/) == null;
    const percentageIsOverHundred = (n) => n > 100;

    if (percentageIsNoValidNumber(percentage)) {
      return false;
    }
    if (percentageIsOverHundred(percentage)) {
      return false;
    }

    return true;
  }
};

export default PercentageInputValidator;
