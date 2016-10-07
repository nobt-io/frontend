import { getNobt, createBill } from "api/api";
import SplitStrategyNames from "const/SplitStrategyNames";

const actionNames = {
  LOAD_NOBT: 'Nobt.LOAD_NOBT',
  SET_NOBT: 'Nobt.SET_NOBT',
  CHANGE_TAB: 'Nobt.CHANGE_TAB',

  UPDATE_BILL_FILTER: 'Nobt.UPDATE_BILLS_FILTER',
  UPDATE_BILL_SORT_PROPERTY: 'Nobt.UPDATE_BILLS_SORT_PROPERTY',

  SET_NEW_BILL_OVERLAY_VISIBILITY: 'Nobt.SET_NEW_BILL_OVERLAY_VISIBILITY',
  SET_NEW_BILL_PERSON_METADATA: 'Nobt.SET_NEW_BILL_PERSON_METADATA',
  SET_NEW_BILL_PERSON_VALUE: 'Nobt.SET_NEW_BILL_PERSON_VALUE',

  ADD_BILL: 'Nobt.ADD_BILL'
};


export const nobtActionFactory = {
  loadNobt: (id) => {
    return (dispatch, getState) => {
      getNobt(id).then(response => {
        dispatch({type: actionNames.SET_NOBT, payload: {nobt: response.data}});
      }, error => {
        //TODO: error handling
      });
    }
  },
  addBill: (bill) => {
    return (dispatch, getState) => {
      return createBill(getState().Nobt.currentNobt.id, bill);
    }
  },
  changeTab: (tabName) => ({type: actionNames.CHANGE_TAB, payload: {tabName: tabName}}),
  updateBillFilter: (filter) => ({type: actionNames.UPDATE_BILL_FILTER, payload: {filter: filter}}),
  updateBillSortProperty: (property) => ({type: actionNames.UPDATE_BILL_SORT_PROPERTY, payload: {property: property}}),
  setNewBillOverlayVisibility: (visibility) => ({type: actionNames.SET_NEW_BILL_OVERLAY_VISIBILITY, payload: {visibility}}),
  setNewBillMetaData: (metaData) => ({type: actionNames.SET_NEW_BILL_PERSON_METADATA, payload: {metaData}}),
  setNewBillPersonValue: (name, value) => ({type: actionNames.SET_NEW_BILL_PERSON_VALUE, payload: {name, value}})

};

const actionHandlers = {
  [actionNames.SET_NOBT]: (state, action) => {

    var newBillViewInfo = {...state.newBillViewInfo};

    //paidByPersonIsNotSet, reset it with first person
    if (state.newBillViewInfo.paidByPerson === "") {
      newBillViewInfo = {...state.newBillViewInfo, paidByPerson: action.payload.nobt.participatingPersons[ 0 ]};
    }

    const response = action.payload.nobt;

    var newNobt = {
      id: response.id,
      name: response.name,
      currency: response.currency,
      participatingPersons: response.participatingPersons,
      transactions: response.transactions,
      bills: response.expenses,
    };

    return ({...state, currentNobt: newNobt, newBillViewInfo: newBillViewInfo});
  },
  [actionNames.CHANGE_TAB]: (state, action) => ({...state, activeTab: action.payload.tabName}),
  [actionNames.UPDATE_BILL_FILTER]: (state, action) => ({...state, billFilter: action.payload.filter}),
  [actionNames.UPDATE_BILL_SORT_PROPERTY]: (state, action) => ({
    ...state,
    billSortProperty: action.payload.property
  }),

  [actionNames.SET_NEW_BILL_OVERLAY_VISIBILITY]: (state, action) => {
    return {...state, newBillViewInfo: {...state.newBillViewInfo, show: action.payload.visibility}};
  },
  [actionNames.SET_NEW_BILL_PERSON_METADATA]: (state, action) => {
    var paidByPerson = action.payload.metaData.paidByPerson;

    /* if paidByPerson is not a nobtMember, it should be added.*/
    var members = state.currentNobt.participatingPersons.slice(0);
    var paidByPersonIsMemberOfNobt = members.indexOf(paidByPerson) >= 0;
	  if (!paidByPersonIsMemberOfNobt) {
      members.push(paidByPerson);
    }

    var newNobt = {...state.currentNobt, participatingPersons: members};
    return {...state, newNobt, newBillViewInfo: {...state.newBillViewInfo, ...action.payload.metaData}};
  },
  [actionNames.SET_NEW_BILL_PERSON_VALUE]: (state, action) => {
    console.log(action.payload);
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
  currentNobt: {
    id: "",
    name: "",
    currency: "",
    participatingPersons: [],
    transactions: [],
    bills: [],
  },

  activeTab: "transactions",
  billFilter: "",
  billSortProperty: "Date",

  newBillViewInfo: {
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
  }
};

export default function nobtReducer(state = initialState, action) {
  const handler = actionHandlers[ action.type ];
  return handler ? handler(state, action) : state;
}
