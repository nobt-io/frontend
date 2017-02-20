import React from "react"
import NobtContainer from "../../containers/NobtContainer";
import BillDetailOverlay from "./components/BillDetailOverlay";
import withNavigation from "../../../../components/hoc/withNavigation";

export default {
  path: ":billId",
  component: NobtContainer,
  indexRoute: {
    component: withNavigation(BillDetailOverlay)
  }
}
