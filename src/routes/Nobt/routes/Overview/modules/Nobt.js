import { getNobt } from "api/api";
import SplitStrategyNames from "const/SplitStrategyNames"

const actionNames = {
  LOAD_NOBT: 'Nobt.LOAD_NOBT',
  SET_NOBT: 'Nobt.SET_NOBT',
  CHANGE_TAB: 'Nobt.CHANGE_TAB',
  UPDATE_EXPENSES_FILTER: 'Nobt.UPDATE_EXPENSES_FILTER',
  UPDATE_EXPENSES_SORT_PROPERTY: 'Nobt.UPDATE_EXPENSES_SORT_PROPERTY',
  CREATEEXPENSE_SET_MODAL_VISIBILITY: 'Nobt.CREATEEXPENSE_SET_MODAL_VISIBILITY',
  CREATEEXPENSE_UPDATE_EDITSTATE: 'Nobt.CREATEEXPENSE_UPDATE_EDITSTATE',
  CREATEEXPENSE_ADDORUPDATE_SELECTEDPERSON: 'Nobt.CREATEEXPENSE_ADD_SELECTDPERSON',
  CREATEEXPENSE_REMOVE_SELECTEDPERSON: 'Nobt.CREATEEXPENSE_REMOVE_SELECTEDPERSON',

  CREATE_EXPENSE: 'Nobt.CREATE_EXPENSE'
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
  changeTab: (tabName) => ({type: actionNames.CHANGE_TAB, payload: {tabName: tabName}}),

  updateExpensesFilter: (filter) => ( {type: actionNames.UPDATE_EXPENSES_FILTER, payload: {filter: filter}} ),
  updateExpenseSortProperty: (property) => ( {
    type: actionNames.UPDATE_EXPENSES_SORT_PROPERTY,
    payload: {property: property}
  } ),

  setCreateExpenseModalVisibility: (visibility) => ({
    type: actionNames.CREATEEXPENSE_SET_MODAL_VISIBILITY,
    payload: {visibility}
  }),

  createExpense: (expense) => ({type: actionNames.CREATE_EXPENSE, payload: {expense}}),
  createExpenseUpdateEditState: (state) => ({type: actionNames.CREATEEXPENSE_UPDATE_EDITSTATE, payload: {state}}),
  createExpenseAddOrUpdateSelectedPerson: (person) => ({
    type: actionNames.CREATEEXPENSE_ADDORUPDATE_SELECTEDPERSON,
    payload: {person}
  }),
  createExpenseRemoveSelectedPerson: (name) => ({
    type: actionNames.CREATEEXPENSE_REMOVE_SELECTEDPERSON,
    payload: {name}
  }),

};

const actionHandlers = {
  [actionNames.SET_NOBT]: (state, action) => {

    const createExpenseViewInfo = {
      ...state.createExpenseViewInfo,
      paidByPerson: action.payload.nobt.participatingPersons[ 0 ]
    };

    return ({...state, currentNobt: action.payload.nobt, createExpenseViewInfo: createExpenseViewInfo});
  },
  [actionNames.CHANGE_TAB]: (state, action) => ({...state, activeTab: action.payload.tabName}),
  [actionNames.UPDATE_EXPENSES_FILTER]: (state, action) => ({...state, expenseFilter: action.payload.filter}),
  [actionNames.UPDATE_EXPENSES_SORT_PROPERTY]: (state, action) => ({
    ...state,
    expenseSortProperty: action.payload.property
  }),

  [actionNames.CREATEEXPENSE_SET_MODAL_VISIBILITY]: (state, action) => {
    return {...state, createExpenseViewInfo: {...state.createExpenseViewInfo, show: action.payload.visibility}};
  },
  [actionNames.CREATEEXPENSE_UPDATE_EDITSTATE]: (state, action) => {

    var paidByPerson = action.payload.state.paidByPerson;
    var members = state.currentNobt.participatingPersons;
    var paidByPersonIsMemberOfNobt = members.indexOf(paidByPerson) >= 0;

    if (!paidByPersonIsMemberOfNobt) {
      members.push(paidByPerson);
    }

    var newNobt = {...state.currentNobt, participatingPersons: members};
    return {...state, newNobt, createExpenseViewInfo: {...state.createExpenseViewInfo, ...action.payload.state}};
  },
  [actionNames.CREATEEXPENSE_ADDORUPDATE_SELECTEDPERSON]: (state, action) => {

    var personToAdd = action.payload.person;
    var currentStrategy = state.createExpenseViewInfo.splitStrategy;
    var personExistsInState = state.createExpenseViewInfo.selectedPersons[ currentStrategy ].filter(s => s.name === personToAdd.name).length > 0

    var newSelectedPersons = state.createExpenseViewInfo.selectedPersons[ currentStrategy ].slice(0);
    if (personExistsInState) {
      newSelectedPersons = newSelectedPersons.filter(s => s.name !== personToAdd.name);
    }
    newSelectedPersons.push({name: personToAdd.name, value: personToAdd.value});

    var selectedPersonStateClone = {
      [SplitStrategyNames.EQUAL]: state.createExpenseViewInfo.selectedPersons[ SplitStrategyNames.EQUAL ].slice(0),
      [SplitStrategyNames.UNEQUAL]: state.createExpenseViewInfo.selectedPersons[ SplitStrategyNames.UNEQUAL ].slice(0),
      [SplitStrategyNames.PERCENTAGE]: state.createExpenseViewInfo.selectedPersons[ SplitStrategyNames.PERCENTAGE ].slice(0)
    };
    selectedPersonStateClone[ currentStrategy ] = newSelectedPersons;

    return {
      ...state,
      createExpenseViewInfo: {...state.createExpenseViewInfo, selectedPersons: selectedPersonStateClone}
    };
  },
  [actionNames.CREATEEXPENSE_REMOVE_SELECTEDPERSON]: (state, action) => {

    var nameToRemove = action.payload.name;
    var currentStrategy = state.createExpenseViewInfo.splitStrategy;

    var newSelectedPersons = state.createExpenseViewInfo.selectedPersons[ currentStrategy ].slice(0).filter(s => s.name !== nameToRemove);

    var selectedPersonStateClone = {
      [SplitStrategyNames.EQUAL]: state.createExpenseViewInfo.selectedPersons[ SplitStrategyNames.EQUAL ].slice(0),
      [SplitStrategyNames.UNEQUAL]: state.createExpenseViewInfo.selectedPersons[ SplitStrategyNames.UNEQUAL ].slice(0),
      [SplitStrategyNames.PERCENTAGE]: state.createExpenseViewInfo.selectedPersons[ SplitStrategyNames.PERCENTAGE ].slice(0)
    };
    selectedPersonStateClone[ currentStrategy ] = newSelectedPersons;

    return {
      ...state,
      createExpenseViewInfo: {...state.createExpenseViewInfo, selectedPersons: selectedPersonStateClone}
    };
  },
};

const initialState = {
  currentNobt: {
    name: '',
    currency: '',
    participatingPersons: [],
    transactions: [],
    expenses: [],
  },

  activeTab: 'transactions',
  expenseFilter: '',
  expenseSortProperty: 'Date',

  createExpenseViewInfo: {
    show: true,
    subject: "",
    creationDate: new Date(),
    paidByPerson: "",
    amount: 0,
    splitStrategy: SplitStrategyNames.EQUAL,
    selectedPersons: {
      [SplitStrategyNames.EQUAL]: [],
      [SplitStrategyNames.UNEQUAL]: [],
      [SplitStrategyNames.PERCENTAGE]: []
    }
  }
};

export default function nobtReducer(state = initialState, action) {
  const handler = actionHandlers[ action.type ];
  return handler ? handler(state, action) : state
}
