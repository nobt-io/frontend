import React from 'react'
import Checkbox from 'react-toolbox/lib/checkbox';

import PropTypes from "./PropTypes";
import PersonListItem from "./PersonListItem"
import TopInfo from "./TopInfo"

export const AmountEqualSplitPersonList = (props) => {

  var noPersonSelected = props.selectedPersons.length == 0;

  var isSelectedPerson = (name) => props.selectedPersons.filter(s => s.name == name).length == 1;

  var personSelectionChanged = (checkboxState, person) => {

    var selectedPersons = props.selectedPersons.slice(0);

    if(checkboxState) {
      selectedPersons.push({name: person, amount: 0});
    }else{
      selectedPersons = selectedPersons.filter(s => s.name !== person);
    }

    props.onSelectedPersonsChanged(selectedPersons);
  };

  var personItems = props.persons.map(p => {
    return (
      <PersonListItem key={p} name={p}>
        <Checkbox checked={isSelectedPerson(p)} onChange={(state) => personSelectionChanged(state, p)}/>
      </PersonListItem>
    )
  });

  return (
    <div>
      { noPersonSelected && <TopInfo>please select at least <b>one</b> person</TopInfo>}
      { personItems }
    </div>);
};

AmountEqualSplitPersonList.propTypes = PropTypes;

export default AmountEqualSplitPersonList
