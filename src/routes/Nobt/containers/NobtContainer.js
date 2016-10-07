import { connect } from "react-redux";
import { nobtActionFactory } from "../modules/Nobt";
import Nobt from "../components/Nobt";
import {
  getName,
  getCurrency,
  getMembers,
  getBills,
  getDebtSummaries,
  getTotal,
  getFilteredBills,
  getActiveTabIndex,
  getBillFilter,
  getBillSortProperty,
  getNewBillMetaData,
  getNewBillPersonData
} from '../selectors'

const mapActionCreators = {
  loadNobt: (id) => nobtActionFactory.loadNobt(id),
  changeTab: (tabName) => nobtActionFactory.changeTab(tabName),
  addBill: (bill) => nobtActionFactory.addBill(bill),
  closeNewBillOverlay: () => nobtActionFactory.setNewBillOverlayVisibility(false),
  openNewBillOverlay: () => nobtActionFactory.setNewBillOverlayVisibility(true),
  setNewBillMetaData: (metaInfo) => nobtActionFactory.setNewBillMetaData(metaInfo),
  setNewBillPersonValue: (name, value) => nobtActionFactory.setNewBillPersonValue(name, value),
  updateBillFilter: (filter) => nobtActionFactory.updateBillFilter(filter),
  updateBillSortProperty: (property) => nobtActionFactory.updateBillSortProperty(property),
};

const mapStateToProps = (state) => {
  return {
    name: getName(state),
    currency: getCurrency(state),
    total: getTotal(state),
    members: getMembers(state),
    debtSummaries: getDebtSummaries(state),
    bills: getFilteredBills(state),
    billFilter: getBillFilter(state),
    billSortProperty: getBillSortProperty(state),

    activeTabIndex: getActiveTabIndex(state),
    isNobtEmpty: getBills(state).length === 0,

    newBillMetaData: getNewBillMetaData(state),
    newBillPersonData: getNewBillPersonData(state)
  };
};

export default connect(mapStateToProps, mapActionCreators)(Nobt)
