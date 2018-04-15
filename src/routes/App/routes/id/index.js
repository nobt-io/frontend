import React from "react";
import BillDetailPage from "./components/BillDetailPage";
import withNavigation from "../../../../components/hoc/withNavigation";

export const pathVariable = "billId";

export default {
  path: `:${pathVariable}`,
  component: withNavigation(BillDetailPage)
};
