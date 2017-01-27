import DoneScreen from "./components/DoneScreen";
import withNavigation from "components/hoc/withNavigation";
import { getCreatedNobtId } from "../../modules/selectors";
import LocationBuilder from "../../../App/modules/navigation/LocationBuilder";

export default (store) => ({
  path: "done",
  component: withNavigation(DoneScreen),
  indexRoute: {
    onEnter: (nextState, replace) => {

      let previousStepIncomplete = !getCreatedNobtId(store.getState());

      if (previousStepIncomplete) {
        LocationBuilder.fromWindow().pop().push("name").apply(replace)
      }
    }
  }

})
