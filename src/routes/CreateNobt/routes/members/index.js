import AddMembersForm from "./components/AddMembersForm";
import { getNobtName } from "../../modules/selectors";
import LocationBuilder from "../../../App/modules/navigation/LocationBuilder";

export default (store) => ({
    path: "members",
    component: AddMembersForm,
    indexRoute: {
      onEnter: (nextState, replace) => {

        let previousStepIncomplete = !getNobtName(store.getState());

        if (previousStepIncomplete) {
          LocationBuilder.fromWindow().pop().push("name").apply(replace)
        }
      }
    }
  }
)
