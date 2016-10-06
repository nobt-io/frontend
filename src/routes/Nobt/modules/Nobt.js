import { getNobt } from "api/api";
import SplitStrategyNames from "const/SplitStrategyNames"

const actionNames = {
  LOAD_NOBT: 'Nobt.LOAD_NOBT',
  SET_NOBT: 'Nobt.SET_NOBT',
  CHANGE_TAB: 'Nobt.CHANGE_TAB',

  UPDATE_EXPENSES_FILTER: 'Nobt.UPDATE_EXPENSES_FILTER',
  UPDATE_EXPENSES_SORT_PROPERTY: 'Nobt.UPDATE_EXPENSES_SORT_PROPERTY',

  SET_NEW_EXPENSE_OVERLAY_VISIBILITY: 'Nobt.SET_NEW_EXPENSE_OVERLAY_VISIBILITY',
  SET_NEW_EXPENSE_PERSON_METADATA: 'Nobt.SET_NEW_EXPENSE_PERSON_METADATA',
  SET_NEW_EXPENSE_PERSON_VALUE: 'Nobt.SET_NEW_EXPENSE_PERSON_VALUE',

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
  updateExpensesFilter: (filter) => ({type: actionNames.UPDATE_EXPENSES_FILTER, payload: {filter: filter}}),
  updateExpenseSortProperty: (property) => ({type: actionNames.UPDATE_EXPENSES_SORT_PROPERTY, payload: {property: property}}),
  setNewExpenseOverlayVisibility: (visibility) => ({type: actionNames.SET_NEW_EXPENSE_OVERLAY_VISIBILITY, payload: {visibility}}),
  createExpense: (expense) => ({type: actionNames.CREATE_EXPENSE, payload: {expense}}),
  setNewExpenseMetaData: (metaData) => ({type: actionNames.SET_NEW_EXPENSE_PERSON_METADATA, payload: {metaData}}),
  setNewExpensePersonValue: (name, value) => ({type: actionNames.SET_NEW_EXPENSE_PERSON_VALUE, payload: {name, value}})

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

  [actionNames.SET_NEW_EXPENSE_OVERLAY_VISIBILITY]: (state, action) => {
    return {...state, createExpenseViewInfo: {...state.createExpenseViewInfo, show: action.payload.visibility}};
  },
  [actionNames.SET_NEW_EXPENSE_PERSON_METADATA]: (state, action) => {
        var paidByPerson = action.payload.metaData.paidByPerson;

    /* if paidByPerson is not a nobtMember, it should be added.*/
    var members = state.currentNobt.participatingPersons.slice(0);
    var paidByPersonIsMemberOfNobt = members.indexOf(paidByPerson) >= 0;
    if (!paidByPersonIsMemberOfNobt) members.push(paidByPerson);

    var newNobt = {...state.currentNobt, participatingPersons: members};
    return {...state, newNobt, createExpenseViewInfo: {...state.createExpenseViewInfo, ...action.payload.metaData}};
  },
  [actionNames.SET_NEW_EXPENSE_PERSON_VALUE]: (state, action) => {
    console.log(action.payload);
    var personName = action.payload.name;
    var personValue = action.payload.value;
    var currentStrategy = state.createExpenseViewInfo.splitStrategy;
    var personExistsInState = state.createExpenseViewInfo.involvedPersons[ currentStrategy ].filter(s => s.name === personName).length > 0;

    /* Add or Update Persons */
    var newSelectedPersons = state.createExpenseViewInfo.involvedPersons[ currentStrategy ].slice(0);
    if (personExistsInState) {
      newSelectedPersons = newSelectedPersons.filter(s => s.name !== personName);
    }
    newSelectedPersons.push({name: personName, value: personValue});

    var selectedPersonStateClone = {
      [SplitStrategyNames.EQUAL]: state.createExpenseViewInfo.involvedPersons[ SplitStrategyNames.EQUAL ].slice(0),
      [SplitStrategyNames.UNEQUAL]: state.createExpenseViewInfo.involvedPersons[ SplitStrategyNames.UNEQUAL ].slice(0),
      [SplitStrategyNames.PERCENTAGE]: state.createExpenseViewInfo.involvedPersons[ SplitStrategyNames.PERCENTAGE ].slice(0)
    };
    selectedPersonStateClone[ currentStrategy ] = newSelectedPersons;

    return {
      ...state,
      createExpenseViewInfo: {...state.createExpenseViewInfo, involvedPersons: selectedPersonStateClone}
    };
  }
};

const initialState = {
  currentNobt: {
    name: "",
    currency: "",
    participatingPersons: [],
    transactions: [],
    expenses: [],
  },

  activeTab: "transactions",
  expenseFilter: "",
  expenseSortProperty: "Date",

  createExpenseViewInfo: {
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

export default function nobtReducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ];
  return handler ? handler(state, action) : state;
}
