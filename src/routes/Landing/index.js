import LandingPage from "./components/LandingPage";
import withNavigation from "../../components/hoc/withNavigation";

// Sync route definition
export default (store) => {
  return {
    component : withNavigation(LandingPage)
  }
}
