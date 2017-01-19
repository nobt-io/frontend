import { createSelector } from "reselect";
import _debug from "debug";

const getViewState = (state) => state.App.viewState;

const getActiveTab = createSelector([ getViewState ], (viewState) => viewState.activeTab);

export const getBillFilter = createSelector([ getViewState ], (viewState) => viewState.billFilter);
export const getBillSortProperty = createSelector([ getViewState ], (viewState) => viewState.billSortProperty);
export const getActiveTabIndex = createSelector([ getActiveTab ], activeTabName => {

  var tabNameIndexMapping = {
    'transactions': 0,
    'bills': 1
  };

  const newTabIndex = tabNameIndexMapping[ activeTabName ] || 0;

  _debug('selectors:getActiveTabIndex')(`New tab index '${newTabIndex}' calculated from '${activeTabName}'.`);

  return newTabIndex;
});
