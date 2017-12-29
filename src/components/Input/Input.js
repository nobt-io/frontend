import * as React from "react";
import styles from "./Input.scss"
import { Input } from "react-toolbox/lib/input/index";
import { Legend } from "components/text";


export default ({value, onChange, type, placeholder, legend, error}) => {

  const inputType = type || "text";

  const errorIsTrueOrNonEmpty = Boolean(error);
  const errorIsErrorMessage = (error && error.length && error.length !== 0) === true;

  const showError = errorIsTrueOrNonEmpty;
  const errorMessage = errorIsErrorMessage ? error : legend;

  return (
    <div>
      <Input hint={placeholder} type={inputType} value={value} onChange={onChange} error={showError ? errorMessage : undefined} />
      {!showError && (<div className={styles.legendContainer}><Legend>{legend}</Legend></div>)}
    </div>
  )
}
