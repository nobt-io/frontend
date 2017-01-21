import SplitStrategyNames from "const/SplitStrategyNames";
import _debug from "debug";

const log = _debug("AddBillForm:reducer");

export const addBillFormReducer = (state = initialState, action) => {

  let addNewMember = function (stateCopy, member) {

    stateCopy.members = [ ...stateCopy.members, member ]
    stateCopy.personValues = [ ...stateCopy.personValues, {
      name: member,
      value: splitStrategyDefaultValueFactory(stateCopy.splitStrategy)
    } ];

    return stateCopy
  };

  switch (action.type) {

    case "NewMemberAdded": {

      let newMember = action.payload.member;

      if (!newMember || newMember === action.payload) {
        return state;
      }

      return addNewMember({...state}, newMember)
    }

    case "NewDebteeSelected": {
      let {debtee, isNewMember} = action.payload;

      if (!debtee && !isNewMember) {
        return state;
      }

      if (debtee === state.debtee) {
        return state;
      }

      let stateCopy = {...state};

      if (isNewMember) {
        stateCopy = addNewMember(stateCopy, debtee);
      }

      stateCopy.debtee = debtee;

      return stateCopy
    }

    case "SplitStrategyChanged": {
      return {
        ...state,
        splitStrategy: action.payload.splitStrategy
      }
    }

    case "ShareValueChanged": {

      let others = state.personValues.filter(pv => pv.name !== action.payload.name);

      return {
        ...state,
        personValues: [
          ...others,
          action.payload
        ]
      }
    }

    case "NewMembersProvided": {

      let initialHydration = state.members.length === 0;

      // if this is not the initial hydration of the store with data, we don't want to override person values
      if (!initialHydration) {

        log("Skipping action because store is already hydrated.")

        return state
      }

      let newMembers = action.payload.members;

      return {
        ...state,
        members: newMembers,
        personValues: defaultPersonValuesFor(state.splitStrategy, newMembers)
      }
    }

    case "AmountChanged": {


      return {
        ...state,
        amount: action.payload.amount
      }
    }

    case "DescriptionChanged": {
      return {
        ...state,
        description: action.payload.description
      }
    }
  }

  return state;
};

function defaultPersonValuesFor(splitStrategy, members) {

  log("defaultPersonValuesFor", splitStrategy, members);

  return members.map(name => { return {name: name, value: splitStrategyDefaultValueFactory(splitStrategy)} })
}

const splitStrategyDefaultValueFactory = (strategy) => {
  switch (strategy) {
    case SplitStrategyNames.EQUAL:
      return true;

    case SplitStrategyNames.PERCENTAGE:
    case SplitStrategyNames.UNEQUAL:
      return 0;
  }
};
