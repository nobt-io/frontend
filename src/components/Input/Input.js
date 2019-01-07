import * as React from "react";
import { Input } from "react-toolbox-legacy/lib/input/index";
import styles from "./Input.scss"

export default ({type, placeholder, error, ...props}) => {

  const inputType = type || "text";

  return (
    <div>
      <Input theme={styles} hint={placeholder} type={inputType} error={error} {...props} />
    </div>
  )
}
