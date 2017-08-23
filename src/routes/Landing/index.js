import withNavigation from "../../components/hoc/withNavigation";
import LandingPage from "./components/LandingPage"

// Sync route definition
export default (store) => {
  return {
    component: withNavigation(LandingPage)
  }
}
