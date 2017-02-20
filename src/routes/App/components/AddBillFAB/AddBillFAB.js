import React from "react";
import styles from "./AddBillFAB.scss";
import { Button } from "react-toolbox/lib/button";
import withNavigation from "components/hoc/withNavigation";
import LocationBuilder from "../../modules/navigation/LocationBuilder";

// TODO: Use a real FAB library here that allows to hide the button on scroll
export const AddBillFAB = (props) => {

  return (
    <Button
      icon='add'
      className={styles.button}
      primary
      floating
      onClick={ () => LocationBuilder.fromWindow().push("newBill").apply(props.push) }
    />
  )
};


export default withNavigation(AddBillFAB)
