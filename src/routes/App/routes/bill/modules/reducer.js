import SplitStrategyNames from "const/SplitStrategyNames";
import {
  AMOUNT_CHANGED,
  CLEAR_ADD_BILL_FORM, CLEAR_CONVERSION_INFORMATION,
  DESCRIPTION_CHANGED,
  FOCUS_ID_CHANGED,
  NEW_DEBTEE_SELECTED,
  NEW_MEMBER_ADDED,
  ON_CONVERSION_RATE_CHANGED,
  ON_FOREIGN_CURRENCY_CHANGED,
  SHARE_VALUE_CHANGED,
  UPDATE_ADD_BILL_STATUS
} from "./actions";

export const addBillFormReducer = (state = initialState, action) => {

  function createPersonValue(member) {
    return {
      name: member,
      value: state.defaultValues[ state.splitStrategy ]
    }
  }

  /**
   * Checks whether a given candidate person is already explicitly added to the current bill. (i.e. a PersonValue is set)
   */
  function isTransientMember(candidate) {
    return state.personValues.map(pv => pv.name).indexOf(candidate) >= 0;
  }

  switch (action.type) {

    case NEW_MEMBER_ADDED: {

      let {member} = action.payload;
      let memberNotSet = !member;

      if (memberNotSet) {
        return state;
      }

      return {
        ...state,
        personValues: [
          ...state.personValues,
          createPersonValue(member)
        ]
      };
    }

    case NEW_DEBTEE_SELECTED: {

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
          debtee
        };
      }

      // Member is not yet in the current bill. Explicitly add them and return the new state.
      return {
        ...state,
        debtee,
        personValues: [
          ...state.personValues,
          createPersonValue(debtee)
        ]
      };
    }

    case SHARE_VALUE_CHANGED: {

      let others = state.personValues.filter(pv => pv.name !== action.payload.name);

      return {
        ...state,
        personValues: [
          ...others,
          action.payload
        ]
      }
    }

    case AMOUNT_CHANGED: {
      return {
        ...state,
        amount: parseFloat(action.payload.amount)
      }
    }

    case DESCRIPTION_CHANGED: {
      return {
        ...state,
        description: action.payload.description
      }
    }

    case CLEAR_ADD_BILL_FORM: {
      return initialState;
    }

    case FOCUS_ID_CHANGED: {
      return {
        ...state,
        focusId: action.payload.focusId,
      }
    }
    case UPDATE_ADD_BILL_STATUS: {
      return {
        ...state,
        addBillStatus: action.payload.status
      }
    }
    case ON_FOREIGN_CURRENCY_CHANGED: {

      let currentInformation = state.currencyConversionInformation || {
        foreignCurrency: null,
        conversionRate: null
      };

      return {
        ...state,
        currencyConversionInformation: {
          foreignCurrency: action.payload.foreignCurrency,
          conversionRate: currentInformation.conversionRate
        }
      }
    }
    case ON_CONVERSION_RATE_CHANGED: {

      let currentInformation = state.currencyConversionInformation || {
        foreignCurrency: null,
        conversionRate: null
      };

      return {
        ...state,
        currencyConversionInformation: {
          foreignCurrency: currentInformation.foreignCurrency,
          conversionRate: action.payload.conversionRate
        }
      }
    }
    case CLEAR_CONVERSION_INFORMATION: {
      return {
        ...state,
        currencyConversionInformation: null      }
    }
  }

  return state;
};

export const initialState = {
  addBillStatus: null,
  debtee: null,
  description: "",
  focusId: "",
  amount: 50,
  currencyConversionInformation: {
    foreignCurrency: {
      value: "AUD",
      label: "Australian Dollar"
    },
    conversionRate: 1.63
  },
  splitStrategy: SplitStrategyNames.EQUAL,
  personValues: [],
  defaultValues: {
    EQUAL: true,
    PERCENTAGE: 0,
    UNEQUAL: 0
  }
};
