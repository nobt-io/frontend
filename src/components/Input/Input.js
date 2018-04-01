import * as React from "react";
import { Input } from "react-toolbox/lib/input/index";
import styles from "./Input.scss"

export default ({type, placeholder, ...props}) => {

  const inputType = type || "text";

  return (
    <div>
      <Input theme={styles} hint={placeholder} type={inputType} {...props} />
    </div>
  )
}
