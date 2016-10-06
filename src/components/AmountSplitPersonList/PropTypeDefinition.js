import React from 'react'

export default {
  selectedPersons: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
    amount: React.PropTypes.number.isRequired,
  })),
  personNames: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  removeSelectedPerson: React.PropTypes.func.isRequired,
  addOrUpdateSelectedPerson: React.PropTypes.func.isRequired
}
