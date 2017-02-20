import { connect } from "react-redux";
import Nobt from "../components/Nobt";
import { addMember, invalidateNobt } from "../modules/currentNobt/actions";
import { getName, getCurrency, getMembers, getBills, getTotal, getFilteredBills, getFetchNobtStatus } from "../modules/currentNobt/selectors";
import { updateBillFilter, updateBillSortProperty } from "../modules/viewState/actions";
import { getBillFilter, getBillSortProperty } from "../modules/viewState/selectors";
import withNavigation from "../../../components/hoc/withNavigation";

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
    fetchStatus: getFetchNobtStatus(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    addMember: (name) => dispatch(addMember(name)),
    updateBillFilter: (memberName) => dispatch(updateBillFilter(memberName)),
    updateBillSortProperty: (property) => dispatch(updateBillSortProperty(property)),
    invalidateNobtData: () => dispatch(invalidateNobt())
  }
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Nobt))
