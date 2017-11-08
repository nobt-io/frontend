import * as React from "react";
import styles from "./text.scss"
import classnames from "classnames";

export const Heading = (props) => <h1 className={styles.heading}>{props.children}</h1>;

export const Title = (props) => <h3 className={classnames(styles.title, {
  [props.className]: props.className
})}>{props.children}</h3>;

export const SubTitle = (props) => <p className={styles.subTitle}>{props.children}</p>;
