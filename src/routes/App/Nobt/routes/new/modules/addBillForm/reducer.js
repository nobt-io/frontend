import SplitStrategyNames from "../../../../../../../const/SplitStrategyNames";
import _debug from "debug";

const log = _debug("reducers:addBillForm");

export const addBillFormReducer = (state = initialState, action) => {

  let addNewMember = function (stateCopy, member) {

    stateCopy.personValues = [
      ...stateCopy.personValues,
      {
        name: member,
        value: stateCopy.defaultValues[ stateCopy.splitStrategy ]
      }
    ];

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

/**
 *
 */
const initialState = {
  addBillStatus: null,
  debtee: null,
  description: "",
  amount: 0,
  splitStrategy: SplitStrategyNames.EQUAL,
  personValues: [],
  defaultValues: {
    EQUAL: true,
    PERCENTAGE: 0,
    UNEQUAL: 0
  }
};
