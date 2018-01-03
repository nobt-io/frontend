import * as React from "react";
import styles from "./text.scss"
import classnames from "classnames";

export const Heading = ({children}) => <h1 className={styles.heading}>{children}</h1>;
export const SubHeading = ({children}) => <h2 className={styles.subHeading}>{children}</h2>;
export const Caption = ({children}) => <h3 className={styles.caption}>{children}</h3>;
export const Legend = ({children}) => <p className={styles.legend}>{children}</p>;


export const Title = (props) => <h3 className={classnames(styles.title, {
  [props.className]: props.className
})}>{props.children}</h3>;
export const SubTitle = (props) => <p className={styles.subTitle}>{props.children}</p>;
