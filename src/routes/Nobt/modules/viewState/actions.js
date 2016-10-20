export const CHANGE_TAB = 'Nobt.CHANGE_TAB';
export const UPDATE_BILL_FILTER = 'Nobt.UPDATE_BILL_FILTER';
export const UPDATE_BILL_SORT_PROPERTY = 'Nobt.UPDATE_BILL_SORT_PROPERTY';


export function changeTab(name) {
  return {
    type: CHANGE_TAB,
    payload: {
      tabName: name
    }
  }
}

export function updateBillFilter(memberName) {
  return {
    type: UPDATE_BILL_FILTER,
    payload: {
      memberName
    }
  }
}

export function updateBillSortProperty(property) {
  return {
    type: UPDATE_BILL_SORT_PROPERTY,
    payload: {
      property
    }
  }
}
