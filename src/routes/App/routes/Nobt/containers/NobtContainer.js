import { connect } from "react-redux";
import Nobt from "../components/Nobt";

import { withRouter } from 'react-router'

import AsyncActionStatus from "../../../../../const/AsyncActionStatus"

import { addMember, fetchNobt, addBill, acknowledgeAddBillStatus } from "../modules/currentNobt/actions"
import { getName, getCurrency, getMembers, getBills, getDebtSummaries, getTotal, getFilteredBills, getAddBillStatus } from '../modules/currentNobt/selectors'

import { changeTab, updateBillFilter, updateBillSortProperty } from "../modules/viewState/actions"
import { getActiveTabIndex, getBillFilter, getBillSortProperty } from '../modules/viewState/selectors'

const mapActionCreators = {
  fetchNobt,
  addMember,
  changeTab,
  addBill,
  acknowledgeAddBillStatus,
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

    addBillSuccessful: getAddBillStatus(state) === AsyncActionStatus.SUCCESSFUL,
    addBillInProgress: getAddBillStatus(state) === AsyncActionStatus.IN_PROGRESS,
  };
};

export default connect(mapStateToProps, mapActionCreators)(withRouter(Nobt))
