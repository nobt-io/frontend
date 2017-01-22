import React from "react"
import NobtContainer from "../../containers/NobtContainer";
import BillDetailOverlay from "./components/BillDetailOverlay";

export default {
  path: ":billId",
  component: NobtContainer,
  indexRoute: {
    component: BillDetailOverlay
  }
}
