import {
  SET_NEW_BILL_PERSON_VALUE,
  SET_NEW_BILL_OVERLAY_VISIBILITY,
  ADD_BILL_STARTED,
  ADD_BILL_FAILED,
  ADD_BILL_SUCCEEDED
} from "./actions"

import SplitStrategyNames from "const/SplitStrategyNames";

const handlers = {

  [SET_NEW_BILL_OVERLAY_VISIBILITY]: (state, action) => {
    return {...state, show: action.payload.visibility};
  },

  [SET_NEW_BILL_PERSON_VALUE]: (state, action) => {
    var personName = action.payload.name;
    var personValue = action.payload.value;
    var currentStrategy = state.newBillViewInfo.splitStrategy;
    var personExistsInState = state.newBillViewInfo.involvedPersons[ currentStrategy ].filter(s => s.name === personName).length > 0;

    /* Add or Update Persons */
    var newSelectedPersons = state.newBillViewInfo.involvedPersons[ currentStrategy ].slice(0);
    if (personExistsInState) {
      newSelectedPersons = newSelectedPersons.filter(s => s.name !== personName);
    }
    newSelectedPersons.push({name: personName, value: personValue});

    var selectedPersonStateClone = {
      [SplitStrategyNames.EQUAL]: state.newBillViewInfo.involvedPersons[ SplitStrategyNames.EQUAL ].slice(0),
      [SplitStrategyNames.UNEQUAL]: state.newBillViewInfo.involvedPersons[ SplitStrategyNames.UNEQUAL ].slice(0),
      [SplitStrategyNames.PERCENTAGE]: state.newBillViewInfo.involvedPersons[ SplitStrategyNames.PERCENTAGE ].slice(0)
    };
    selectedPersonStateClone[ currentStrategy ] = newSelectedPersons;

    return {
      ...state,
      newBillViewInfo: {...state.newBillViewInfo, involvedPersons: selectedPersonStateClone}
    };
  }
};

const initialState = {

  isCreating: false,
  show: false,
  subject: "",
  creationDate: new Date(),
  paidByPerson: "",
  amount: 0,
  splitStrategy: SplitStrategyNames.EQUAL,
  involvedPersons: {
    [SplitStrategyNames.EQUAL]: [],
    [SplitStrategyNames.UNEQUAL]: [],
    [SplitStrategyNames.PERCENTAGE]: []
  }
};

export default function newBill(state = initialState, action) {
  const handler = handlers[ action.type ];
  return handler ? handler(state, action) : state;
}
