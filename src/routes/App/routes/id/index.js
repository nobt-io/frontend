import React from "react"
import NobtContainer from "../../containers/NobtContainer";
import BillDetailOverlay from "./components/BillDetailOverlay";
import withNavigation from "../../../../components/hoc/withNavigation";

const pathVariable = "billId"
exports.pathVariable = pathVariable;

export default {
  path: `:${pathVariable}`,
  component: NobtContainer,
  indexRoute: {
    component: withNavigation(BillDetailOverlay)
  }
}
