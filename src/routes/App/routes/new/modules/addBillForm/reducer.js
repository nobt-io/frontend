import SplitStrategyNames from "const/SplitStrategyNames";
import _debug from "debug";
import { UPDATE_ADD_BILL_STATUS } from "./actions";
import { isTransientMemberFactory } from "./selectors";

const log = _debug("reducers:addBillForm");

export const addBillFormReducer = (state = initialState, action) => {

  function createPersonValue(member) {
    return {
      name: member,
      value: state.defaultValues[ state.splitStrategy ]
    }
  }

  function isTransientMember(candidate) {
    /*
     * Construct a pseudo version of the global state.
     *
     * Necessary for the selector because they, in contrast to reducers, always expect the global state.
     * This reducer on the other hand only operates on its local state.
     */
    let pseudoGlobalState = {
      App: {
        addBillForm: state
      }
    };

    let isTransientMemberFn = isTransientMemberFactory(pseudoGlobalState);

    return isTransientMemberFn(candidate);
  }

  switch (action.type) {

    case "NewMemberAdded": {

      let newMember = action.payload.member;

      if (!newMember) {
        return state;
      }

      return {
        ...state,
        personValues: [
          ...state.personValues,
          createPersonValue(newMember)
        ]
      };
    }

    case "NewDebteeSelected": {
      let {debtee} = action.payload;

      let debteeNotSet = !debtee;
      let debteeNotChanged = debtee === state.debtee;

      if (debteeNotSet || debteeNotChanged) {
        return state;
      }

      if (isTransientMember(debtee)) {
        // Member is already in the current bill, just update the debtee.
        return {
          ...state,
          debtee: debtee
        };
      }

      // Member is not yet in the current bill. Explicitly add them and return the new state.
      return {
        ...state,
        debtee: debtee,
        personValues: [
          ...state.personValues,
          createPersonValue(debtee)
        ]
      };
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

    case "ClearAddBillForm": {
      return initialState;
    }

    case UPDATE_ADD_BILL_STATUS: {
      return {
        ...state,
        addBillStatus: action.payload.status
      }
    }
  }

  return state;
};

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
