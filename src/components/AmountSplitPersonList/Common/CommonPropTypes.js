import React from "react";

export default {
  involvedPersons: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
    amount: React.PropTypes.number.isRequired,
  })),
  nobtMembers: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  setPersonValue: React.PropTypes.func.isRequired,
  involvedPersonsAreValid: React.PropTypes.bool.isRequired,
  involvedPersonsCalculationInfo: React.PropTypes.number.isRequired
};
