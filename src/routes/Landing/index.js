import withNavigation from "../../components/hoc/withNavigation";

// Sync route definition
export default (store) => {
  return {
    getComponent() {
      return import(/* webpackChunkName: "LandingPage" */ "./components/LandingPage").then(LandingPage => {
        return withNavigation(LandingPage)
      })
    }
  }
}
