import { connect } from "react-redux";
import Nobt from "../components/Nobt";

import { withRouter } from 'react-router'

import { addMember, fetchNobt } from "../modules/currentNobt/actions"
import { getName, getCurrency, getMembers, getBills, getDebtSummaries, getTotal, getFilteredBills } from '../modules/currentNobt/selectors'

import { addBill, setNewBillOverlayVisibility, setNewBillPersonValue } from "../modules/newBill/actions"
import { getNewBillMetaData, getNewBillPersonData } from '../modules/newBill/selectors'

import { changeTab, updateBillFilter, updateBillSortProperty } from "../modules/viewState/actions"
import { getActiveTabIndex, getBillFilter, getBillSortProperty } from '../modules/viewState/selectors'

const mapActionCreators = {
  fetchNobt,
  addMember,
  changeTab,
  addBill,

  // TODO this should be internal state of the overlay
  closeNewBillOverlay: () => setNewBillOverlayVisibility(false),
  openNewBillOverlay: () => setNewBillOverlayVisibility(true),

  setNewBillPersonValue,
  updateBillFilter,
  updateBillSortProperty,
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

export default connect(mapStateToProps, mapActionCreators)(withRouter(Nobt))
