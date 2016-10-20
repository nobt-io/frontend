import React from 'react'
import styles from './Spinner.scss'
import MDSpinner from "react-md-spinner"

export const Spinner = (props) => (
  <div className={props.className}>
    {props.isLoading && (
      <div className={styles.spinnerContainer}>
        <MDSpinner className={styles.spinner} size={30}/>
      </div>
    ) }

    {!props.isLoading && props.children}
  </div>
)

export default Spinner
