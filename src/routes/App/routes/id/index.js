import React from "react";
import BillDetailPage from "./components/BillDetailPage";
import withNavigation from "../../../../components/hoc/withNavigation";

const pathVariable = "billId";
exports.pathVariable = pathVariable;

export default {
  path: `:${pathVariable}`,
  component: withNavigation(BillDetailPage)
};
