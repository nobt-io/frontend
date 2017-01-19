import { push } from "react-router-redux";

export function navigateAddNewBill(dispatch, props) {
  return () => {
    let baseLocation = props.location.pathname;

    dispatch(push(baseLocation + "new"))
  }
}
