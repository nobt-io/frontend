import * as React from "react";
import styles from "./InputLegend.scss"
import { Legend } from "../text";

export default ({children, error}) => {

  const errorIsTrueOrNonEmpty = Boolean(error);
  const errorIsErrorMessage = (error && error.length && error.length !== 0) === true;

  const showError = errorIsTrueOrNonEmpty;
  const errorMessage = errorIsErrorMessage ? error : children;

  return showError
    ? (<Legend><span className={styles.error}>{errorMessage}</span></Legend>)
    : (<Legend>{children}</Legend>)
}
