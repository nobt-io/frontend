import * as React from "react";
import { Input } from "react-toolbox/lib/input/index";
import styles from "./Input.scss"

export default ({value, onChange, type, placeholder}) => {

  const inputType = type || "text";

  return (
    <div>
      <Input theme={styles} hint={placeholder} type={inputType} value={value} onChange={onChange}/>
    </div>
  )
}
