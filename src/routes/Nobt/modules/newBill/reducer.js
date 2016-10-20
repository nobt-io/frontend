import {
  SET_NEW_BILL_PERSON_VALUE,
  SET_NEW_BILL_OVERLAY_VISIBILITY,
  UPDATE_ADD_BILL_STATUS
} from "./actions"

import AsyncActionStatus from "const/AsyncActionStatus";
import SplitStrategyNames from "const/SplitStrategyNames";

const updateAddBillStatusActionPayloadHandler = {
  [AsyncActionStatus.IN_PROGRESS]: () => {},
  [AsyncActionStatus.SUCCESSFUL]: () => {},
  [AsyncActionStatus.FAILED]: () => {},
};

const handlers = {

  [UPDATE_ADD_BILL_STATUS]: (state, action) => {
    let newState = updateAddBillStatusActionPayloadHandler[ action.payload.status ](action.payload);

    return {
      ...state,
      ...newState,
      addBillStatus: action.payload.status
    }
  },

  [SET_NEW_BILL_OVERLAY_VISIBILITY]: (state, action) => {
    return {...state, show: action.payload.visibility};
  },

  [SET_NEW_BILL_PERSON_VALUE]: (state, action) => {
    var personName = action.payload.name;
    var personValue = action.payload.value;
    var currentStrategy = state.splitStrategy;
    var personExistsInState = state.involvedPersons[ currentStrategy ].filter(s => s.name === personName).length > 0;

    /* Add or Update Persons */
    var newSelectedPersons = state.involvedPersons[ currentStrategy ].slice(0);
    if (personExistsInState) {
      newSelectedPersons = newSelectedPersons.filter(s => s.name !== personName);
    }
    newSelectedPersons.push({name: personName, value: personValue});

    var selectedPersonStateClone = {
      [SplitStrategyNames.EQUAL]: state.involvedPersons[ SplitStrategyNames.EQUAL ].slice(0),
      [SplitStrategyNames.UNEQUAL]: state.involvedPersons[ SplitStrategyNames.UNEQUAL ].slice(0),
      [SplitStrategyNames.PERCENTAGE]: state.involvedPersons[ SplitStrategyNames.PERCENTAGE ].slice(0)
    };
    selectedPersonStateClone[ currentStrategy ] = newSelectedPersons;

    return {
      ...state,
      involvedPersons: selectedPersonStateClone
    };
  }
};

const initialState = {

  addBillStatus: null,

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
