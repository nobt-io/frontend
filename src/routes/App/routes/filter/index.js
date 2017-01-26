import FilterBillOverlay from "./components/FilterBillOverlay";
import NobtContainer from "../../containers/NobtContainer";

export default {
  path: "changeFilter",
  component: NobtContainer,
  indexRoute: {
    component: FilterBillOverlay
  }
}
