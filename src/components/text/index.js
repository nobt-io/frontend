import * as React from "react";
import styles from "./text.scss"

export const Title = (props) => <h3 className={styles.title}>{props.children}</h3>;
export const SubTitle = (props) => <p className={styles.subTitle}>{props.children}</p>;
