import { push } from "react-router-redux";
import Locations from "./Locations";

export function navigateAddNewBill(dispatch, props) {
  return () => {

    let newPath = Locations.fromReduxLocation(props.location).addPart("new").path;

    dispatch(push(newPath))
  }
}
