import {connect} from 'react-redux'
import debug from 'debug';

import {nobtActionFactory} from '../modules/AddExpense'

/*  This is a container component. Notice it does not contain any JSX,
 nor does it import React. This component is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 component - in this case, the counter:   */

import AddExpense from '../components/AddExpense'

/*  Object of action creators (can also be function that returns object).
 Keys will be passed as props to presentational components. Here we are
 implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = {
  loadNobt: (id) => nobtActionFactory.loadNobt(id),
  addPerson: (name) => nobtActionFactory.addPerson(name),
  togglePerson: (name) => nobtActionFactory.togglePerson(name),
}

const mapStateToProps = (state) => {
  return {
    members: Object.keys(state.AddExpense.members),
    nobtName: state.AddExpense.name,
    personExists: (name) => name in state.AddExpense.members,
    isChecked: (name) => state.AddExpense.members[name] === true
  };
}

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

 import { createSelector } from 'reselect'
 const counter = (state) => state.counter
 const tripleCount = createSelector(counter, (count) => count * 3)
 const mapStateToProps = (state) => ({
 counter: tripleCount(state)
 })

 Selectors can compute derived data, allowing Redux to store the minimal possible state.
 Selectors are efficient. A selector is not recomputed unless one of its arguments change.
 Selectors are composable. They can be used as input to other selectors.
 https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapActionCreators)(AddExpense)
