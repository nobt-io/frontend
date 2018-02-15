import * as React from "react";
import styles from "./Container.scss"

function container(style) {
  return ({children}) => (<div className={style}>{children}</div>);
}

export const Page = container(styles.page);
export const Main = container(styles.main);
