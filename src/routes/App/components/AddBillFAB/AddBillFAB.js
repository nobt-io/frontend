import React from "react";
import styles from "./AddBillFAB.scss";
import { Button } from "react-toolbox/lib/button";
import withNavigation from "components/hoc/withNavigation";
import LocationBuilder from "../../modules/navigation/LocationBuilder";
import FAB from "components/FAB/FAB";
import FABMenuItem from "components/FAB/FABMenuItem";


// TODO: Use a real FAB library here that allows to hide the button on scroll
const AddBillFAB = (props) => {

  return (
    <Button
      icon='add'
      className={styles.button}
      primary
      floating
      onClick={() => LocationBuilder.fromWindow().push("newBill").apply(props.push)}
    />
  )
};

/*
const AddBillFAB = (props) => (
  <FAB>
    <FABMenuItem
      label="Add a bill"
      buttonProps={{
        icon: "receipt"
      }}
    />
    <FABMenuItem
      label="Pay someone"
      buttonProps={{
        icon: 'payment'
      }}
    />
  </FAB>
);
*/

export default withNavigation(AddBillFAB)
