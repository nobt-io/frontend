import React from 'react'
import Checkbox from 'react-toolbox/lib/checkbox';

import PropTypes from "./PropTypeDefinition";
import PersonListItem from "./PersonListItem"
import TopInfo from "./TopInfo"

export const AmountEqualSplitPersonList = (props) => {

  const {persons, selectedPersons, addOrUpdateSelectedPerson, removeSelectedPerson} = props;

  const onSelectionChanged = (state, name) => {
    if (state)
      addOrUpdateSelectedPerson({name: name, value: 1});
    else
      removeSelectedPerson(name);
  };

  const personItems = persons.map(p => {return (
    <PersonListItem key={p} name={p}>
      <Checkbox checked={selectedPersons.filter(sp => sp.name == p).length > 0} onChange={(state) => onSelectionChanged(state, p)}/>
    </PersonListItem>)
  });

  return (
    <div>
      { <TopInfo>please select at least <b>one</b> person</TopInfo>}
      { personItems }
    </div>);
};

AmountEqualSplitPersonList.propTypes = PropTypes;

export default AmountEqualSplitPersonList
