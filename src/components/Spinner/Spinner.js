import React from 'react'
import styles from './Spinner.scss'
import MDSpinner from "react-md-spinner"

// This component creates a vertically and horizontally centered spinner.
export const Spinner = (props) => (
  <div className={styles.spinnerContainer}>
    <MDSpinner className={styles.spinner} size={30}/>
  </div>
);

export default Spinner
