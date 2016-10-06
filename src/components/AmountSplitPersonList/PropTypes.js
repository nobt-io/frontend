import React from 'react'

export default {
  selectedPersons: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    amount: React.PropTypes.number.isRequired,
  })),
  persons: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  amount: React.PropTypes.number.isRequired,
  onSelectedPersonsChanged: React.PropTypes.func.isRequired
}
