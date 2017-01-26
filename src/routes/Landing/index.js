import LandingPage from './components/LandingPage'
import reducer from "./modules/reducer"
import { injectReducer } from "../../store/reducers";

// Sync route definition
export default (store) => {

  injectReducer(store, {key: 'newNobtForm', reducer});

  return {
    component : LandingPage
  }
}
