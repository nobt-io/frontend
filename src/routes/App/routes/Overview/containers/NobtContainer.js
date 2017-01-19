import { connect } from "react-redux";
import Nobt from "../components/Nobt";
import { withRouter } from "react-router";
import { addMember, fetchNobt, addBill } from "../modules/currentNobt/actions";
import { navigateAddNewBill } from "../modules/navigation/actions";
import { getName, getCurrency, getMembers, getBills, getTotal, getFilteredBills } from "../modules/currentNobt/selectors";
import { updateBillFilter, updateBillSortProperty } from "../modules/viewState/actions";
import { getBillFilter, getBillSortProperty } from "../modules/viewState/selectors";

const mapStateToProps = (state) => {
  return {
    name: getName(state),
    currency: getCurrency(state),
    total: getTotal(state),
    members: getMembers(state),
    bills: getFilteredBills(state),
    billFilter: getBillFilter(state),
    billSortProperty: getBillSortProperty(state),
    isNobtEmpty: getBills(state).length === 0,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchNobt: (id) => dispatch(fetchNobt(id)),
    addMember: (name) => dispatch(addMember(name)),
    updateBillFilter: (memberName) => dispatch(updateBillFilter(memberName)),
    updateBillSortProperty: (property) => dispatch(updateBillSortProperty(property)),
    navigateAddNewBill: navigateAddNewBill(dispatch, props)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nobt))
