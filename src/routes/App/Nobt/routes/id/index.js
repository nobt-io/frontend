import React from "react"
import NobtContainer from "../../containers/NobtContainer";

export default {
  path: ":billId",
  component: NobtContainer,
  indexRoute: {
    component: () => (<h1>Details here</h1>)
  }
}
