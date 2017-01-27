import AddMembersForm from "./components/AddMembersForm";
import { getNobtName } from "../../modules/selectors";
import withNavigation from "components/hoc/withNavigation";

export default (store) => ({
    path: "members",
    component: withNavigation(AddMembersForm),
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
