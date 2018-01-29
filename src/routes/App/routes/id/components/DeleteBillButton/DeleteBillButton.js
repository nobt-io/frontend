import Button from "../../../../../../components/Button/Button";
import React from "react";
import styles from "./DeleteBillButton.scss"

export default ({onClick}) => (
  <div>
    <Button theme={styles} label="Delete" icon="delete" onClick={onClick} raised/>
  </div>
)
