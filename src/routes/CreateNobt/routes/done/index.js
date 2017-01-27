import DoneScreen from "./components/DoneScreen";
import withNavigation from "components/hoc/withNavigation";

export default (store) => ({
  path: "done",
  component: withNavigation(DoneScreen)
})
