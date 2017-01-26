import reducer from "./modules/reducer";
import { injectReducer } from "../../store/reducers";
import BasicInformationForm from "./components/BasicInformationForm";

export default (store) => {

  injectReducer(store, {key: 'createNobtForm', reducer});

  return {
    path: 'create',
    component: BasicInformationForm,
    indexRoute: {
      component: null
    },
    childRoutes: [
    ]
  }
}
